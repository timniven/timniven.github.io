---
layout: post
title: "[Paper] ArgMin17: Analyzing Semantic Types of Claims and Premises"
date: 2017-12-28
categories: argument_mining argmin17 papers
---

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

Long term goal is understanding what makes a message persuasive.

Claims and premises are annotated with <strong>semantic types</strong>.

Premises:
- ethos (credibility of speaker)
- logos (logic)
- pathos (emotion)

Claims:
- interpretation/prediction ("John probably went home", "X will win")
- evaluation ("Your policy is a bad one")
- agreement
- disagreement

The last two claim types reflect the dialogical nature of argumentation.

Three guiding questions:
- can humans reliably annotate these semantic types?
- is there a recurrent order in claim/premise semantic types?
- are certain types more highly correlated with persuasive messages?

Data comes from Change My View: users award delta points to users that managed
to change their mind. This is first annotated for claims and premises by expert
annotators, and then they crowd-source annotation of semantic types.

Data available <a href="https://github.com/chridey/change-my-view-modes">here</a>.

IAA:
- premise types: Kripendorff's \\( \alpha \gt 0.63 \\)
- claim types: \\( \alpha = 0.46 \\)

Related work...

Persuasian detection and prediction:
- Ghosh et al. (2016) showed that the number of supported/unsupported claims
  and the structure of arguments directly affect persuasion
- Tan et al. (2016): lexical diversity plays a major role in persuasion
- Wei et al. (2016): aspects of argumentative language and social interaction
  are persuasive features
- Rosenthal and McKeown (2017) focus on persuaders in the social group

Logos, ethos, pathos:
- Habernal and Gurevych (2017) included logos and pathos (but not ethos)
  in there annotation of 990 user generated comments
- the IAC corpus (Walker et al., 2012) includes the distinction between
  fact and emotion based arguments
- Das et al. (2016) found that messages in social media were more likely
  received positively if the emotional or logical components
  matched the topic
- Lukin et al. (2017) looked at personality traits and emotional or logical
  arguments affect persuasiveness

Semantics of argument components:
- Becker et al. (2016) analyze correlations between situation entity types
  and claims/premises
- Park et al. (2015) classify claims in relation to the subjectivity/objectivity
  of the premises in their support
- Budzynska et al. (2014) and Budzynska and Reed (2011) analyze illocutionary
  structures in argumentative dialogues drawing from <strong>Inference Anchoring
  Theory</strong>, relying on different types of pragmatic information

Dataset:
- same as Tan et al. (2016)
- posts with author and one responder
- "positive" if delta points awarded; else "negative"; 39 of each
- 278 turns of dialogue
- 2,615 propositions
- 2,148 sentences
- 786 sentences contain a claim (36.5%)
- 1,086 sentences contain a premise (49.7%)
- 22% of sentences contain no annotation
- 15.8% of claims contain rational evaluations; 8.7% contain interpretations;
  7.3% contain emotional evaluations; 2.5% contain agreement; 2.3% contain
  disagreement (where agree and disagree are e.g. "<agreement>Yes</agreement>,
  but..."
- 44% of premises contain logos; 29% contain pathos; 3% contain ethos

Annotation:
- claim-premise model follows Stab and Gurevych (2014b)
- premises considered at the "proposition" level, not the clause, since
  premises often span multiple clauses
- premises can also be rhetorical questions: "Don't you love that Google
  knows your favourite pair of shoes?"

Claim types:
- citing Freeman (2000)
- evaluation types are further subdivided into rational and emotional,
  "His political program is solid" vs "I do not like doing yoga."

Annotation analysis:
- there was significant disagreement among annotators for claim type
- some claims are complex sentences formed by two propositions which
  can include multiple types and lead to disagreement

Sequential patterns in semantic types:
- the patterns are identified in heat maps (p. 6)
- they don't show very much that is ground-breaking
- however some patterns are identified as statistically significant
- some patterns will relate to the ChangeMyView forum - e.g. rational evaluation
  following beginning of post
- however I expect some are more invariant - e.g. logos following a disagreement
  (although that may also reflect the forum)
- I wonder whether this information could provide signal to assist full AM

Persuasiveness of semantic types:
- they say for the gold annotations, the transition matrix has a p-value
  of 0.59, very high, likely explained by low counts for some cells;
  however for the claim-premise matrix it is 0.001
- rational evaluations are less likely to be found in winning arguments
  (9% of positive and 14% of negative)
- pathos and logos together most likely (23% and 17%)
- positive threads (i.e. where the poster changed their mind) feature
  more interpretations especially based on logos (this type of pattern
  is less subjective)

Statistical knowledge for me:
- Pearson's chi-squared test of independence considers the distribution
  of data and does not include sample sizes, making it inappropriate for
  imbalanced data (here positive threads are longer than negative)
- Uses the Yates correction for low frequencies

Future work:
- add attack-support relation annotation
- analyze relations between topics and semantic types (e.g. scientific
  requires more rational, moral requires more pathos)
