---
layout: post
title: "[Paper] Relation Extraction with Matrix Factorization and Universal Schemas"
date: 2018-03-25
categories: papers relation-extraction
---


# Relation Extraction with Matrix Factorization and Universal Schemas

Riedel et al. (2013), NAACL

http://www.aclweb.org/anthology/N13-1008

## Problem

- Most previous work uses a pre-defined, finite, and fixed schema of relation types, aligns some text to this schema, which is costly in terms of annotation
- It is more desirable to have a distantly supervised schema
- More distant supervision can be provided by aligning database records with the sentences in which they occur
- But this relies on a large database that has the desired schema
- This can be avoided by using language itself as the source of the schema
- But this suffers from a lack of generalization (really?)
- Clustering has been used to overcome this
- But clustering fails to capture implicature: e.g. worked-at doesn't imply scientist-at
- Claim: any relational schema would inherently be brittle and ill-defined, having ambiguities, problematic boundary cases, and incompleteness (noting Freebase lacks "critized" and "scientist-at" relations)

## Solution

- Don't force textual meaning into pre-defined boxes
- Claim: modeling semantic equivalence will always be elusive
- Instead concentrate on predicting source data
- Universal schema is the union of all source schemas: surface patterns as well as relations in the various existing databases
- Focus on learning asymmetric implicature - e.g. X-historian-at-Y => X-works-at-Y, but not vice versa
- Working with text and relations at the same time is mutually supporting since the surface features offer more information when predicting relations, and vice versa
- Probabilistic matrix factorization and collaborative filtering solution
- Rows come from cross-document entity resolution across pre-existing structured DBs and textual corpora
- Columns are the union of relations in the DBs and observed surface forms
- Learn lower dimensional manifolds for tuples, relations and entities and a set of weights that capture direct correlations between relations

## Model

- A fact is a relation and entity tuple (pair) $\langle r, t \rangle$
- Set of observed facts $\mathcal{O}$
- Set of observed facts for a tuple $\mathcal{O}_t = \{ \langle r, t \rangle \in \mathcal{O} \}$
- Modeling $p(y_{r, t} = 1)$ where $y_{r,t}$ is a binary random variable that is true iff $t$ is in relation $r$
- All models have the form

$$p(y_{r, t} = 1|\theta_{r, t}) = \sigma(\theta_{r, t}) = \frac{1}{1 + \exp(-\theta_{r, t})}$$

### Latent Feature Model

- Measure compatibility between relate and entity typle with dot product of latent feature representations of size $K^F$

$$\theta_{r, t}^F = \sum_k^{K^F} a_{r, k} v_{t, k}$$

- This apparently corresponds to generalized PCA where the matrix of natural parameters is defined as the low rank factorization $\mathbf{AV}$.
- A point I can't quite see: they say asymmetry can be captured by assigning more peaked vectors to more specific relations, and more uniform vectors to general relations.

### Neighbourhood Model

- Interpolate the confidence for a given tuple and relation given truness of other similar relations for the same tuple
- Use weights $w_{r, r'}$ to define the directed association strength

$$\theta_{r, t}^N = \sum_{(r', t) \in \mathcal{O} \backslash \{ (r, t) \}} w_{r, r'}$$

- Amounts to a collection of local log-linear classifiers, one for each relation $r$ with feature functions $f_{r, r'}(t) = \Bbb{I}[r' \neq r \land (r', t) \in \mathcal{O}]$ and weights $w_r$
- Does not look at synergies between relations and text, rather focuses on relations

### Entity Model

- Instead of using a brittle pre-defined set of entity types, learn latent entity representations from data
- For each entity a latent feature vector $\mathbf{t}_e$ of dimension $K^E$
- Also a vector $\mathbf{d}_i$ of the same dimension for argument slots of relations
- Measure entity and argument compatibility

$$\theta_{r, t}^E = \sum_{i=1}^{\text{arity}(r)} \sum_k^{KE} d_{i, k} t_{t_i, k}$$

- Note that since entities are put into pairs, parameters are shared across rows in the universal schema

### Combined Model

- Each of the models captures something important

$$\theta_{r, t}^{NFE} = \theta_{r,t}^N + \theta_{r,t}^F + \theta_{r,t}^E$$

### Objective

- Create a set of ranked pairs by sampling tuples not observed for the relations in the observed set
- Rank observed facts $f^+ = \langle r, t^+ \rangle \in \mathcal{O}$ above unobserved $f^- = \langle r, t^- \rangle \notin \mathcal{O}$
- We want $p(f^+) \gt p(f^-)$ and therefore $\theta_{f^+} \gt \theta_{f^-}$
- Sum up terms

$$\text{Obj} = \sum_{\langle r, t^+ \rangle \in \mathcal{O}} \sum_{\langle r, t^- \rangle \notin \mathcal{O}} \log(\sigma(\theta_{f^+} - \theta_{f^-}))$$

- All parameters regularized with quadratic penalty

## Training Details

- One unobserved fact for each observed fact per epoch

## Background Knowledge and Related Work

- Using language itself as the source data
  - Etzioni et al. 2008
- Probabilistic models of matrix factorization and collaborative filtering
  - Collins et al. 2001 (generalized PCA)
  - Koren 2008 (neighbourhood model)
  - Rendle et al. 2009
- Freebase types of entities not fine enough to allow relations to discriminate
  - Yao et al. 2012b
- Distant Supervision
  - Bunescu and Mooney 2007
  - Mintz et al. 2009
  - Riedel et al. 2010
  - Hoffman et al. 2011
  - Surdeanu et al. 2012
- Never-ending learning
  - Carlson et al. 2010

## Discussion

- The learned entity types are nice and what I have had in mind for some time
- Asymmetric Gaussian embeddings with KL divergence for relations...?
- What about Poincare embeddings? They would seem a natural choice for a scenario like this

## Next

- This is one to implement, also as a baseline for potential subsequent experiments
- The dataset seems hard to come by, and for purchase (https://catalog.ldc.upenn.edu/ldc2008t19) - do we have it in the department somewhere?