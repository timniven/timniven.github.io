---
layout: post
title: "[Paper] ArgMin17: 200k+ Chilean Political Arguments"
date: 2017-12-26
categories: argumentation_mining argmin17 papers
---

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

Arguments are in Spanish, in the Chilean dialect, available here:
https://github.com/uchile-nlp

The writers must provide an argument on why a concept (gender-equality, education) should be included in the constitution. There are 205,000+ arguments, and the average length is 22.6 words per argument.

Three part argument scheme:
- policies ("The state should provide free education for all")
- facts ("Global warming will lead to food insecurity by the mid 21st century"
- values ("Economic growth is less important than protecting the environment"

Two tasks
- Multi-label classification (achieving 90% top-5 accuracy)
- Automatic argument tagging (achieving 65% macro-F1)

Concept classification:
- concepts may be expressed in different ways
- "gender equality" vs "equality of rights for men and women"
- Cohen's kappa 0.85

Argument model:
- criteria of Informal Logic for the detection and analysis of arguments (Hitchcock, 2007, Informal logic and the concept of argument)
- theory of collective intentionality (Searle, 2014, Belief and the social world: the structure of human civilization)
- classification of controversial topics in the American academic debate of Snider and Schnurer (2002) Many sides: debate across the curriculum, and Branham (1991) Debate and critical analysis: The harmony of conflict.

Hitchcock:
- broader notions of argument to capture diverse roles that argument and inference play in real-life contexts (does this really show up in the corpus?)
- allows a premise to be any communication act which asserts a proposition (suggesting, hypothesizing, etc)
- allows a conclusion to be a request for information, request to do something, commissive, expressive, declarative

Searle:
- different arguments have different purposes
- assertive speech acts -> factual arguments, e.g. "Climate change is a problem"
- directive speech acts -> political reasoning, e.g. "Chile must be incorporated into the OECD"

Snider and Schnurer, and Branham:
- whence facts, values, and policies schemes

Facts:
- (subject) (is) (conditions)

Values:
- they talk of abstract <strong>binary</strong> concepts (beautiful vs ugly); (these are best viewed on a continuum in my view)
- similar linguistic composition: (subject) (is) (evaluation)
- pragmatic/instrumental qualifications such as useful and efficient they say
  are preferred to be treated as factual if the depend exclusively on factual
  situations; I suppose this should be OK if we mean we have a agreeable definition
  with respect to which we can simply verify a judgment, otherwise I think the more
  principled view is that many judgments of many kinds are factual in the sense
  that if one accepts certain establish criteria of judgment, then an objective
  application of those criteria should be considered "factual" or at least
  "objective". I don't know where or if this issue turns up in their work

Policies:
- answer the question "What should be done?"
- linguistically: a verbal form that aims towards an illocutive intention (allow, prohibit, apprrove)

Normalization in tagging - all arguments have these parts:
- subject
- verbal syntagm
- nominal ysntagm
- prepositional syntagm
- argumentative mode

Task A:
- given an argument and a topic, predict it's concept

Task B:
- given a concept-argument pair with an open concept (i.e. a concept not predefined
  by the government), determine a concept from the predefined set that the argument
  is most likely referring to

Task C:
- given an argument, predict the argument mode \\(\in \\{\text{policy},
  \text{fact}, \text{value}\\}\\)

Notes:
- The arguments are not annotated with premises and conclusions
- The corpora is in Spanish (I think I could understand it with a little dictionary
  lookup, but I think for my purposes the main point is the above)
