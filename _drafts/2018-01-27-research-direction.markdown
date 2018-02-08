---
layout: post
title: "Research Thoughts: KB Approach to Reasoning"
date: 2018-01-27
categories: research kb reasoning
---

My broad goal: to map out a field of knowledge from reading free text
including the arguments supporting and attacking various propositions.
To provide an interface to this knowledge to aid researchers and
professionals in the relevant field.

Example: biomedical research literature. Could read all papers published
in the area and develop a large index of propositions such as "Drug X
is effective for treating disease Y" that could be searched. This could aid
researchers wanting quick access to this kind of information, and doctors
who may need quick review of such information to make decisions. If
fully automatic, this could in principle keep up with the latest papers
published in real time.

In order to achieve this computers need to understand the meaning of the
text, to have a world model of the domain area, and to understand the
argumentative relations between things.

We therefore need the following techniques:
1) Automatic discovery of this model of the world knowledge - e.g.
   basic definitions: "a drug is a chemical", "chemicals interact with
   other chemicals", and all basic and advanced knowledge in the whole
   area.
2) The ability to reason over this knowledge to discover the implications
   of text. We need this in order to understand the argumentative relations
   in the text. For communicative efficiency we leave much unsaid in any
   discourse. There is much assumed background knowledge. For example,
   we may encounter the phrase "". From this we need to infer "". But to
   do that we need the background knowledge "". We therefore need the
   knowledge in place AND to draw an inference over it. We therefore
   need a reasoning system.

Directions:

Recently I have been reading a lot to do with neural reasoning over KB
triples. I believe this is a promising direction and I will outline why
below, and address the concerns I have about this approach as well.

Why is it good?
- If we have a store of entities and relations, we can make reasoning
  happen, which is what we need. That is to say, this seems like the
  natural way to do this. We need entities. And we need relations
  between entities.

Why is it bad?
- Mapping free text to knowledge triples seems fraught with its own
  difficulties. It could be difficult to parse this accurately. Although

However:
- My intuition is that end-to-end differentiable neural networks will
  see this technique improve over time as jointly trained on the
  objective. That is to say, the network should be able to work out when
  it is doing a bad job of parsing the text from poor performance down-
  stream and correct this accordingly.

Questions for the future:
1) Check out the history of reasoning over KB triples. This needs to be
   fully and deeply understood, including the original motivations, key
   developments, and state of the art.
2) Investigate the difficulties in mapping text to these triples. Again,
   the key papers, the key developments, the state of the art, and the
   well studied difficulties.



