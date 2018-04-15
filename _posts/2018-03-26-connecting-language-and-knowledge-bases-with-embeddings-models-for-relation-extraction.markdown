---
layout: post
title: "[Paper] Connecting Language and Knowledge Bases with Embedding Models for Relation Extraction"
date: 2018-03-26
categories: papers relation-extraction
---

# Connecting Language and Knowledge Bases with Embedding Models for Relation Extraction

Weston et al. (2013), ???

https://arxiv.org/pdf/1307.7973.pdf

## Problem and Solution

- Sub-task of Information Extraction: Relation Extraction, assuming the entities have already been identified
- For a relation mention $m$ including $(h, t)$ the task is to assign the appropriate relation from the KB
- "Weakly supervised" in the sense that all $m$ are associated with all existing links between $(h, t)$ already in the KB
- Novelty of this work is using the KB triples as well as the text to complete this task

## Details

Learn two models:
- One for extracting relations
- One for patterns of relations in the KB

Learning representations for:
- Entities
- Relations
- Words in the vocabulary

### Extracting Relations

Take the window of text around a mention $m$ and calculate a score for each relation

$$
\begin{align*}
S_{m2r}(m, r) &= f(m)^\top r \\
              &= (W^\top \phi(m))^\top r
\end{align*}
$$

where

$$
\begin{align*}
  f(m) &\in \Bbb{R}^k \\
  W &\in \Bbb{R}^{|V| \times k} \\
  r &\in \Bbb{R}^k \\
  m &\in \Bbb{R}^{|V|} \\
\end{align*}
$$

Given the task is weakly supervised, they use a ranking loss over the dataset $\mathcal{D} = \{(m_i, r_i), i = 1, \dots , \lvert \mathcal{D} \rvert \}$ as

$$\forall i, \forall r' \neq r_i, f(m_i)^\top r_i \gt 1 + f(m_i)^\top r'$$

Then given a mention the relation is predicted by

$$\hat{r}(m) = \arg \max_{r' \in \mathcal{R}} S_{m2r}(m, r')$$

But this is not sufficient for PR curve evaluation, in which case use

$$\forall i, h, \forall r' \neq r_i, f(m_i)^\top r_i \gt 1 + f(mj)^\top r'$$

Hard constraints are enforced on embedding norms

$$
\begin{align*}
\forall i, \lVert W_i \rVert_2 &\le 1 \\
\forall j, \lVert r_j \rVert_2 &\le 1
\end{align*}
$$

### Encoding Structured Data of KBs

Score the plausibility of new entity relationships missing from Freebase. Learn vectors of entities and relations. Based on TransE model (I've written up elsewhere), which they write as

$$S_{kb}(h, r, t) = - \lVert h + r - t \rVert_2^2$$

They train a ranking loss over corruptions in all three positions of the relation.

At test time, recalibration of scores over pairs might be required - they therefore simplify to a function of the rank of $r$:

$$\tilde{S}_{kb}(h, r, t) = \phi \left( \sum_{r' \neq r} \delta(S_{kb}(h, r, t) \gt S_{kb}(h, r', t)) \right)$$

where

$$\phi(x) = \begin{cases} 1 &x = t \\ 0 &\text{otherwise} \end{cases}$$

But I'm not clear what $\delta$ is, or how this function works.

### Relation Extraction

For all pairs of entities in the test set, collect all mentions $\mathcal{M}_{h,t}$ and score

$$\hat{r}_{h, t} = \arg \max_{r \in \mathcal{R}} \sum_{m \in \mathcal{M}_{h,r}} S_{m2r}(m, r)$$

At this point the predicted relation could be $NA$, in which case this is returned. Otherwise agreement is sought with the KB and a composite score is calculated as

$$S_{m2r + kb}(h, \hat{r}_{h,t}, t) = \sum_{m \in \mathcal{M}_{h,t}} S_{m2r}(m, \hat{r}_{h,t}) + \tilde{S}_{kb}(h, \hat{r}_{h,t}, t)$$

## Background Knowledge and Related Work

These all use weak supervision and only text
- Craven et al. (1999) matched the Yeast Protein Database with PubMed abstracts
- Training open extractors based on Wikipedia infoboxes: Wu and Weld (2007, 2010)
- Large-scale IE projects: Banko et al. 2007, Carlson et al. 2010
- RE on Wikipedia with Freebase: Mintz et al. 20099
- Multi-instance learning frameworks: Riedel et al. 2010, Hoffman et al. 2011, Surdeanu et al. 2012

More recent and perhaps more interesting
- Riedel et al. 2013, jointly model KB and text relying on collaborative filtering

Previous work connecting words and Wordnet
- Bordes et al. 2012

Scoring plausibility of new relationships between entities not in Freebase
- Nickel et al. 2011
- Bordes et al. 201(1/2/3)

## Discussion

- Where do you get pre-defined relationships from? WordNet? Or I suppose Freebase has a pre-defined set?