---
layout: post
title: "[Paper] Translational Embeddings for Modelling Multi-Relational Data"
date: 2018-04-03
categories: papers entity-embeddings
---


# Translational Embeddings for Modelling Multi-Relational Data

Bordes et al. (2013). NIPS

https://papers.nips.cc/paper/5071-translating-embeddings-for-modeling-multi-relational-data.pdf

## Problem

- Goal is to model multi-relational data from KBs for provision of efficient tool to complete them by adding new facts without requiring extra knowledge
- Modeling involves extracting local or global connectivity patterns in the knowledge graph, and using these to generalize
- For single relational data this can be easier, such as the friend of my friend is my friend
- However these patterns can get more complicated, such as considering whether my friend's friend and I share various interests
- This obviously greatly increases the complexity of potential patterns
- Prior work had focused on increasing the expressivity of the models, but over- (and under-) fitting have been problems, as well as model interpretibility and computation complexity

## Solution

- Energy-based model for learning low-dimensional embeddings of entities
- If $(h, l, t)$ holds, then the embedding for tail $t$ should be close to the vector for head $h$ plus some vector that depends on the relationship $l$
- Motivated by considering that hierarchy is ubiquitous in KBs, and noting that trees have this property: children's relative position to parent is a translation on the y-axis
- This may also work well with the kinds of linear regularities exhibited by word2vec embeddings
- Reduced parameters follows from learning just one low-dimensional embedding for each entity

## Model Details

- If $(h, l, t)$ holds, then we want $h + l \approx t$ to hold, i.e. we want $t$ to be a nearest neighbour to $h + l$, and the others far away
- Energy is given by distance $d(h + l, t)$, taken to be the L1 or L2 norm
- Corrupted pairs are used to provide negative examples, then a margin based ranking loss is used to learn the embeddings

$$
\mathcal{L} = \sum_{(h, l, t) \in S} \sum_{(h', l, t') \in S'} \left[ \gamma + d(h + l, t) - d(h' + l, t') \right]_+
$$

- $[x]_+$ denotes the positive part of $x$
- $\gamma \gt 0$ is the margin hyperparameter
- $S'$ is the set of corrupted triples where either the head or tail (but not both) are replaced by a random entity for an untrue relation
- Entity embeddings (but not relations) are limited to have norm 1 to prevent the model from artificially reducing loss by increasing embedding norms

## Training Details

- See p.3, last paragraph before section 3

## Comparisons

- Main models compared to are:
  - Bordes et al. (2011) Learning structured embeddings of knowledge bases
  - Socher et al. (2013) Learning new facts from knowledge bases with neural tensor networks and semantic word vectors

## Background Knowledge and Related Work

- Latent factor models: Jenatton et al. (2012)
- Non-parametric Bayesian extensions of the stochastic blockmodel: Zhu (2012), Miller et al. (2009), Kemp et al. (2006)
- Tensor factorization models: Harshman and Lundy (1994)
- Collective matrix factorization: [13, 11, 12]
- Bayesian clustering frameworks: [15]
- Energy-based frameworks for learning embeddings of entities: [3, 15, 2, 14]
- Relation extraction [2, 16]

## Datasets

- WordNet
- Freebase
- Kinships

## Discussion

- They note their model can't handle ternary relationship as in the Kinship dataset; however they deal with less complicated relationships better on the real world Freebase
- The didn't compare to Socher's neural tensor network, so that needs to be looked at
- I'm more interested in relation extraction at this point, so need to follow the links [2, 16].