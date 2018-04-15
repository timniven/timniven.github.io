---
layout: post
title: "[Paper] A Semantic Matching Energy Function for Learning with Multi-relational Data"
date: 2018-03-27
categories: papers relation-extraction
---


# A Semantic Matching Energy Function for Learning with Multi-relational Data

Glorot et al. (2013), ?

https://arxiv.org/pdf/1301.3485.pdf

## Problem

- Multi-relational graphs are complicated to manipulate due to
  - noise
  - heterogeneity
  - high dimension

## Solution

- Train compact distributed representations
- Model relations as entities; therefore they can play the role of relation type as in natural language; also requiring less parameters
- Learn them with an energy function that assigns low energies to plausible triples
- Energy function relies on a matching criterion computed between both sides of the triplet
- Energy optimized to be lower for training examples than for others

## Neural Network Parameterization

Relation type should first be used to extract relevant components from each argument's embedding, and put them in a space where they can be compared

1. Each symbol in the triple is mapped to its embedding, $\vec{h}, \vec{r}, \vec{t}$
2. Learn relation-dependent representations of each entity, $\vec{h}' = g(\vec{r}, \vec{h})$ and $\vec{t}' = g(\vec{r}, \vec{t})$
3. Perform "matching" of head and tail via dot product $\vec{h}^\top \vec{t}$

Two options were considered for $g$, only shoing the equations for the head:

Linear form

$$\vec{h}' = W_1 \vec{h} + W_2 \vec{r} + b$$

Bilinear form

$$\vec{h}' = (W_1 \bar{\times}_3 \vec{r}) \vec{h} + b$$

where $\bar{\times}_3$ is the vector-tensor product along the third mode. Need to review some matrial to get that (http://www.ca.sandia.gov/~tgkolda/pubs/bibtgkfiles/SAND2007-6702.pdf).

## Background Knowledge and Related Work

- Statistical relation learning [2]
- Siamese network [1]

## Discussion

- The bilinear performs better in general, and much better on kinships (I believe because they have 3-way relationships there, but check that point)
- The model is outperformed by Latent Factor Model everywhere
- The nicest idea in this work for me is modeling relations as entities