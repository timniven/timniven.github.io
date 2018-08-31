---
layout: post
title: "[Paper] Neural End-to-End Learning for Computational Argumentation Mining
date: 2018-08-31
categories: argmin papers
---

[Eger et al. ACL 2017](https://arxiv.org/abs/1704.06104)


## Key Findings

- Framing AM as token-based dependency parsing is subpar relative to
  token-based sequence tagging
- Multi-task learning improves performance

## Problem

This paper aims to address end-to-end argumentation mining.

## Dependency Parsing Based Model

- They use the model of Miwa and Bansal (2016) **LSTM-ER** with their
  own formulation of the AM problem
- Entity detection and relation classification are decoupled, although
  with shared parameters - more modular than sequence tagging model
  (although that can be recovered with MTL architecture specified below)
- Pretraining on entities (?) and scheduled sampling
  (Bengio et al. 2015) prevent low performance at early training stages
- The model uses a TreeLSTM with dependency parse information for
  relation classification.  **How can this work across sentences?
  How is it actually implemented?**
- This model can in principle model any kind of relations between
  argument components - in contrast to the sequence tagging model that
  is constrained such that each component can only relate to one other

## Sequence Tagging Based Model

Each token will be tagged with a four-tuple
- $b \in \{B, I, O\}$ for component tagging
- $t \in \{\text{Premise}, \text{Claim}, text{Major Claim}, \bot\}$
  for component types
- $d \in \{\dots, -2, -1, 1, 2, \dots, \bot\}$ for position relative to
  connected component
- $s \in \{\text{Support}, \text{Attack}, \text{For}, \text{Ag}, \bot\}$
  for relation type

They use a BiLSTM-CRF-CNN.

## Multi-Task Learning

Following the framework of Sogaard and Goldber (2016) MTL is seen as
multiple layers of LSTMs each responsible for one of the tasks. This
works best when the tasks are hierarchical.

The auxiliary tasks are
- $C$: predicting $(b, t)$ from the four-tuple
- $R$: predicting $(d, s)$

Findings:
- Hierarchical ordering didn't help
- $C$ more helpful than $R$

## Comparison and Analysis

Evaluation metric details from
- Persing and Ng (2016)

They hypothesize that the LSTM-Parser's good relative performance is a
result of encoding its whole stack history rather than just the top
elements on the stack, which makes it aware of much larger contexts.

The LSTM-ER model deteriorates rapidly from paragraph level to essay
level prediction - they hypothesize this is because at essay level the
search space for the tree is so much larger.

In contrast the strength of the sequence tagging model is seen to come
from its simplicity (less overfitting) and the fact it can deal with
longer sequences being "largely invariant to length".

The relatively good performance of LSTM-ER is attributed to decoupling
of component identification and relation prediction. Similar results can
be achieved with the tagging model by using the MTL setting (effectively
decoupling).

The tagging model performs better as it explicitly considers the
distance between components - it is therefore able to reflect the
distribution.

The tagger performance has a lower standard deviation than the parser
over random initializations.

As for training data - the parser only sees 322 trees whereas the tagger
is trained on 120K tokens.

A big source of error is accurately determining component spans.

## Background and Related Work

Two recent approaches to end-to-end learning for AM
- Persing and Ng (2016)
- Stab and Gurevych (2017)

The notion of "argument" critically relies on the underlying argument
theory
- Reed et al. (2008)
- Biran and Rambow (2011)
- Habernal and Gurevych (2015)
- Stab and Gurevych (2017)

Discourse parsing (Muller et al. 2012) for AM
- Pedszus and Stede (2015)

BIO tagging for component idenfitification
- Habernal and Gurevych (2016)

A model that combines sequential (entity) and tree structure (relation)
information so as to be in principle applicable to any problem where
the aim is to extract entities and their relations
- Miwa and Bansal (2016) *could be relevant to FEVER idea

AM and analysis of scientific papers
- Kirschner et al. (2015)

Other MTL
- Sogaard and Goldberg (2016) *most interesting
- Peng and Dredze (2016)
- Yang et al. (2016)
- Rusu et al. (2016)
- Hector and Plank (2017)

Even humans struggle to determine component spans
- Persing and Ng (2016)
- Yang and Cardie (2013)

Use of encoder-decoder framing for AM investigated in
- Potash et al. (2016)

## Datasets

To the authors' best knowledge, the only dataset of quality that
annotates AM in its entire complexity (token-level annotation of
components, their types, and relations and their types)
- Stab and Gurevych (2017)

Notes
- This is the persuasive essay corpus
- Huge imbalance: >90% of relations are supporting
- Prediction on the paragraph level is easier than on the essay level
  because the number of potential configurations of components is
  fewer
- ~30% of relations are next to each other; 66% in $\{-2, -1, 1\}$;
  but values of $-11$ and $+10$ are observed
- ~92% of relations are inter-sentence

## Discussion

Interesting point made in the paper: a model that enforces a constraint
does not necessarily mean it is more suitable for a task. It has
frequently been observed that models tend to produce output consistent
with the constraints in their training data in such situations; thus
they have learned the constraints
- Zhang et al. (2017)
- Hector and Plank (2017)

One question, which the paper does also raise, is whether the
dependency parsing based model is weaker due to a lack of data. The
authors seems to think so. A question then arises: would a dependency
parsing based model overtake a sequence tagging based model with
enough data? Yes, data efficiency is good. But are we in the zone here
where the data really is that small such that general conclusions like
"dependency parsing is worse than sequence tagging" can't be properly
made?

Reading the paper it is hard to know how to implement the LSTM-ER model.
Yes, we must refer to the original author's paper. But because the
TreeLSTM doesn't seem to apply to their problem, the question remains as
to whether they used it as is or modified it somehow.
