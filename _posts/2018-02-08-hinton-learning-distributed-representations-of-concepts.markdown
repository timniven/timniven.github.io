---
layout: post
title: "Learning Distributed Representations of Concepts - Hinton (1986)"
date: 2018-02-08
categories: neural-nets kb classic
---

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

Two Theories of Representation
---

How do we represent concepts?

- extreme localist: concept = neuron
- extreme distributed: concept = pattern of activity over large part of cortex

Accord with main approaches to semantics:

- structuralist (concepts are defined by their relations): encode this
in the connections between atomized neurons with no internal structure
- componential (concepts are sets of features): each feature is a neuron,
set connection weights such that a concept is then a stable pattern of
activity over the whole network
  - robust to noise
  - how to use this for structured reasoning?
  - good for concept similarity and pairwise associations
  - "no obvious way of representing articulated structures composed of a
    number of concepts playing different roles within that structure"

Role-Specific Units
-------------------

We are considering a structure such as:

John (agent) hit (relation) Mary (patient).

Suggestion:

- assign a group of units to each role (agent, relation, patient)
- patterns of activity in that group represent the concepts filling the role
- each unit then represents the conjunction of a role with a feature of
  the concept playing the role (e.g. one unit may be active if the filler
  is male)
- the same concept then has different representations when playing
  different roles

The neurons for the role and the neurons for the concept are different.
The "conjunction" occurs via some kind of composition function.

Potential drawbacks and replies:

- uneconomical to have multiple representations of a single entity
  - yes but having a single representation is less efficient for retrieval
    of, say, all instances where John is the agent. A similar argument applies
    to word searches. If we have "c-ip" and want all options for filling
    in the blank it is inefficient to search all words that have c, i, and p.
    Rather, accounting for their position (like role in our other examples)
    will make it more efficient.
- unclear that the different representations refer to the same entity -
  e.g. "John hit Mary", "Mary divorced John", same John?
  - the solution is to have a canonical representation and then create
    role-specific representations with composition functions.

Choosing Role-Specific Representations
--------------------------------------

We are now dealing with family trees, where instances take the form:

person1 relationship person2

Hinton introduces an extra group of neurons above the role and relationship
representations. This is responsible to looking at interactions between the
participating representations. It can perform "micro-inferences" which is
useful for pattern completion. For example, if the entity of person1 is "old"
and the relationship is "has-husband", and given a missing person2, we can
infer that person2 must also be "old" and activate that neuron.

Note it is a strength of componential representations that we can
do such a thing.

Microinferences can be seen as storing the regularities inherent in a domain
and providing sensible generalization. This is a good criterion for a
representation: that it allow us to express the regularities of a domain.

Returning to this feature neuron for "old". It may be asked whether the network
understands what "old" really means. Philosophically, that is a difficult
question since we don't know what a meaning is. However, sticking with a
truth-condition view, which is perhaps useful to get started, we can say
that if the network correctly partitions the set of all entities into
old and not, and this neuron is active for all old entities, then it has
captured this meaning.

The search for good features can then be viewed as the search for the
most useful and relevant partitions. Note that with continuous values this
allows "fuzzy" partitions. Indeed an advantage. But that does make the
apparent discreteness of biological neurons more of a mystery.


