---
layout: post
title: "[Paper] Indirect Supervision for Relation Extraction using Question-Answer Pairs"
date: 2018-04-01
categories: papers relation-extraction
---

# Indirect Supervision for Relation Extraction using Question-Answer Pairs

Wu et al. (2017), WSDM

https://arxiv.org/pdf/1710.11169v2.pdf

## Problem

- RE systems usually rely on costly and noisy human annotations
- This motivated the move to distant supervision with an existing KB
- Pipeline
  1. detect entity mentions in text
  2. map detected entity mentions to entities in KB
  3. assign, to the candidate type set of each entity mention pair, all KB relation types between their KB-mapped entities
- Two sources of error:
  - incomplete KB (false negatives)
  - context-agnostic labelling process (false positives): two entities are mentioned in a sentence (e.g. Trump flew back to United States), but due to (3) in the process above, relation types that are not expressed are labeled
- Previous work focuses on minimizing either false positives or false negatives, not both

## Solution

- Indirect external supervision from QA task
- Have text from some specific domain, and also a QA set
- Question sentences map to positive and negative sentences (where answers can and cannot be found)
- Positive pairs are enforced to be similar, negative dissimilar
- Generate a graph automatically from mentions, relations, and entity types
- Use a QA set to also construct another graph
- Merge the graphs based on similarity in some way

## Details

- Relation vector space
  - objects whose types are close to each other should have a similar representation
  - what are types?
- QA pair vector space
  - Positive answers sharing the same question should be close to each other
  - what about questions worded differently that essentially have the same meaning? How much noise will this introduce?
- Shared features between relation mentions and QA pairs connect the two vector spaces
  - Linguistic features? How does that work?

### Text Feature Extraction

Extract features such as head token and bigram from POS-tagged corpus.

- $\mathcal{F}_Z$ is the set of features extracted from relation mentions
- $\mathcal{F}_{QA}$ is the set extracted from QA pairs
- $\mathcal{F}$ is the combined set

The overlap between the relation mention and QA pair features is the bridge between the embedding spaces.

Question: what does a feature vector actually represent? Is it a collection of feature values, or is it a vector representation of a single feature?

### Modeling Types of Relation Mentions

The idea is to model co-occurences between linguistic surface features and relation mentions. The intuition is that if the same features co-occur with the same relations, then they should have similar embeddings; whilst relations that share similar surface linguistic features should be close in embedding space.

$$
\begin{align*}
\mathcal{L}_{ZF} &= - \sum_{z_i \in \mathcal{Z}} \sum_{f_i \in \mathcal{F}_z} w_{ij} \log p(f_i|z_i) \\
&= - \sum_{z_i \in \mathcal{Z}} \sum_{f_i \in \mathcal{F}_z} w_{ij} \log \sigma(z_i^\top c_j) + \sum_{v=1}^V \Bbb{E}_{f_j \sim P_n(F)} [ \log \sigma(-z_i^\top c_{j'}]
\end{align*}
$$

- $z_i$ is the relation mention vector and $c_j$ is the text feature vector (still unclear what a feature vector represents)
- in the final form, the first term models observed co-occurrence whilst the second term is negative sampling with $V$ negative samples

In the automatically labeled dataset, some mentions are associated with relations they shouldn't be (false positives). To deal with this, they enforce the relation mention's embedding vector to be closest to the most relevant relation.

Question: how to define the most relevant relation?

The partial loss for each relation mention is then

$$l_i = \max \left\{ 0, 1 - \left[ \max_{r \in \mathcal{R}_i} \phi (z_i, r) - \max_{r' \in \bar{\mathcal{R}}_i} \phi(z_i, r') \right] \right\}$$

- $\phi$ is dot product
- $\bar{\mathcal{R}} = \mathcal{R} \backslash \mathcal{R}_i$

Correlations between features and mentions are integrated with mention and relation type associations so that features may participate in modeling the relation embeddings

$$O_Z = \mathcal{L}_{ZF} + \sum_{i=1}^{N_Z} l_i + \frac{\lambda}{2} \sum_{i=1}^{N_Z} \lVert z_i \rVert_2^2 + \frac{\lambda}{2} \sum_{k=1}^{K_r} \lVert r_k \rVert_2^2$$

- $\lambda \gt 0$ tunes regularization

### Modeling Associations between QA Entity Mention Pairs

Modeled exactly the same, with the same equations as above for mentions and linguistic features. Instead we have the entity pairs in the QA sentence $p_i$ and the QA linguistic features $c_j'$.

The key intuition at this point is that any positive QA entity pair we encounter should be closer in embedding space to other positive answers to the same question than to negative answers to the same question.

$$l_{i,k} = \sum_{p_{k_1} \in \mathcal{P}_i^+, p_{k_2} \in \mathcal{P}_i^-, k_1 \neq k} \max \left\{ 0, 1 - \left[ \phi(p_k, p_{k_1}) - \phi(p_k, p_{k_2}) \right] \right\}$$

Fairly self exaplanatory. It's integrated again just like the other one so

$$O_{QA} = \mathcal{L}_{PF} + \sum_{i=1}^{N_Q} \sum_{k=1}^{N_i^+} l_{i, k} \frac{\lambda}{2} \sum_{k=1}^{N_P} \lVert p_k \rVert_2^2$$

### Joint Optimization Objective

$$O = O_Z + O_{QA}$$

On each iteration alternatively sample from each of the two objectives. Convergence proof in [40].

## Background and Related Work

- Remove redundant training information [16, 21, 26, 36]
  - For each relation, assume one sentence may express it instead of all [16, 36]
- Mapping mentions in text corpus to KB entities (NER) [15, 24]
- Linguistic features for surface patterns [4, 26]
- Margin-based ranking loss [30]
- Second-order proximity idea [44]
- Pairwise ranking [34]
- Edge sampling strategy [44]
- Stochastic sub-gradient descent [40]

## Discussion

- It is a wonderful idea and I like it alot
- What happens if there is no QA dataset available for a given domain - e.g. Philosophy?
  - I am thinking, what if we use Stack Exchange? Scrape QA pairs from there. Select maybe just QA pairs where the length is below some threshold to remove the long-winded replies.
- Still need a target relation type set (this is a problem for me)
- Use an external NER system (I want an integrated one)
- There is definitely mess introduced by the NER setup - p.4 they take the last entity mention in the question sentence to be the question entity
- They don't seem to use dependency information in dealing with their surface patterns
- Looks like pairs of entities are concatenated into a single vector - suboptimal