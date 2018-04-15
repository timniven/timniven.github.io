---
layout: post
title: "[Paper] Improved Representation Learning for Predicting Commonsense Ontologies"
date: 2018-03-28
categories: papers relation-extraction
---

# Improved Representation Learning for Predicting Commonsense Ontologies

Li et al. (2017)

https://arxiv.org/abs/1708.00549

## Problem and Solution

- "Prediction" in the sense of the article is predicting the layout of embeddings in a space
- We are concerned principally here with hierarchical data
- We want to learn embeddings that facilitate <strong>reasoning</strong> so an we can infer missing knowledge from what we have
- Therefore the embeddings must lend themselves to things such as transitivity and negation
- So if a dog is a mammal and a pit bull is a dog, we want to infer that a pit bull is a mammal
- Most previous models only focus on "local prediction": enforcing consistency between localized entities in the space - e.g. semantically similar words are close together
- Some recent research has started to work on "global prediction", where the geometry of the space is used to enforce consistency - e.g. Poincare embeddings in hyperbolic space, a continuous version of trees, for enforcing hierarchical consistency
- This work focuses on the order-embedding model Vendrov et al. (2016), which it is claimed can:
  - complex ordering structure
  - compositional, multi-word entities
- The order embedding model is trained, like many others, from pairs of training examples, drawn from a known hierarchy
- This work extends this in two ways:
  - adding non-hierarchical information in the form of raw text
  - adding longer distance triplet constraints not present in the training pairs

## Background

- Knowledge graph completion (Bordes et al. 2013, Wang et al. 2014, Nickel et al. 2011, Li et al. 2016, Socher et al. 2013)
- Global prediction (Vilnis & McCallum 2015, Vendrov et al. 2016, Nickel & Kiela 2017)

## Datasets

- ConceptNet (Speer et al. 2016)
- WordNet (Miller 1995)
- Microsoft Concept Graph (Wu et al 2012, Want et al. 2015)

## Order Embeddings

The space is constrained such that higher-level concepts $y$ are smaller in every coordinate than lower level concepts $x$

$$x \preceq y \ \text{iff} \ \bigwedge_{i=1}^N x_i \ge y_i $$

This can be visualized thus

![image.png](attachment:image.png)

An energy for this ordering function is

$$d(x,y) = ||\max(0, y - x)||$$

leading to a ranking loss objective

$$L_{\text{Order}} = \sum_{x,y} \max(0, m + d(x, y) - d(x', y')) $$

where $'$ indicates negative samples.

Notes:
- Looks like vectors are constrained to the positive domain
- This is strikingly similar to "Lifted Rule Injection" where they impose the same structural constraint for more and less general entailment rules.

## Joint Text and Order Embedding

A modified CBOW is used to augment the order embedding with signal from raw text. An average embedding $v_2$ from words in the context window $w$ is used to predict the center word $v_1$

$$v_2 = \frac{1}{w} \sum_{k \in \{ -w,\dots,w \}\backslash\{t\}} v_{t + k}$$

Since order embeddings are all positive and compared componentwise $L_1$ is used to measure distance from the context vector, not dot product, yielding the loss

$$L_{\text{CBOW}} = \sum_{w_c, w_t} \max(0, m + ||v_1 - v_2|| - ||v_1' - v_2'||)$$

The final loss is then a weighted sum

$$L_{\text{joint}} = \alpha_1 L_{\text{Order}} + \alpha_2 L_{\text{CBOW}}$$

This yields an accuracy increase from 92.0 to 93.0 on ConceptNet and MCG IS-A relations.

## Long Range Join and Meet Constraints

Using the information in the hierarchy we can augment the training set by including constraints from transitive cases. If we have a pair of words $w_1$ and $w_2$ as in the following figure, we find the nearest common parent $w_p$ and child $w_c$ and enforce the desired ordering

![image.png](attachment:image.png)

To enforce the constraint, we consider the "join" $\lor$ and "meet" $\land$ of the word pairs. The join is the pointwise max, and the meet is the pointwise min of the two vectors (clear in the figure). Then we have

$$\begin{align*}
d_c(w_1, w_2, w_c) &= ||\max(0), w_1 \lor w_2 - w_c||^2 \\
d_p(w_1, w_2, w_p) &= ||\max(0), w_p - w_1 \land w_2||^2 \\
L_{\text{join}} &= \sum{w_1, w_2, w_c} \max(0, m + d_c(w_1, w_2, w_c)) \\
L_{\text{meet}} &= \sum{w_1, w_2, w_p} \max(0, m + d_p(w_1, w_2, w_p)) \\
L &= L_{\text{join}} + L_{\text{meet}} \\
\end{align*}$$

Adding the join and meet constraints leads to a performance increase on the WordNet ontology from 90.6 to 91.3 accuracy.