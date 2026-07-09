---
layout: ../../layouts/BlogLayout.astro
title: 'Jane Street Puzzle Aug-2025'
pubDate: '2025-09-01'
description: 'A detailed explanation of the solution to Jane Street puzzle for August 2025'
author: 'Joshua Hizgiaev'
tags: ["JaneStreet", "Puzzle"]
---

## What is Jane Street?

[Jane Street](https://www.janestreet.com/) is a global **proprietary quantitative trading firm** and **liquidity provider (market maker)**. The firm trades electronically across many asset classes and is known for a heavy focus on technology, collaborative problem-solving, and functional programming (notably OCaml, with open-source libraries like [Base](https://opensource.janestreet.com/base/)).

## What are Jane Street puzzles?

Jane Street runs a long-standing series of public **math/logic/programming puzzles**. A new puzzle is posted every month, you can submit your solution, and they later publish official solutions, and if you want, your name can be publicly posted as well as one of the people that solved it.

I known of their existance for a while, and decided to make an honest attempt for once, knowing it would probably take a while before I see any progress.

## Problem statement: Dogs Playing Poker

"You won’t find poker faces here–these poor pups can’t hide their emotions or the cards that cause them! What they’re feeling is practically spelled out for everyone to see. It should be enough for you to figure out which cards my pet doodle is holding.

Submit your answer as an abbreviation of the cards using letters or numbers with the card then suit. For example, the Ace of Spades and Ten of Hearts would be abbreviated as AS,10H."

![JSAug2025Puzzle](/blog/jsaug2025.png)

### Solution breakdown

First lets observe part of the prompt: "You won’t find poker faces here–these poor pups can’t hide their emotions or the cards that cause them! What they’re feeling is practically spelled out for everyone to see." From here, we are basically given the first steps on solving the problem, namely being observing the dogs faces themselves, and that whatever they are feeling, is **spelled** out for everyone to see.

This gives a hint that we will possibly derive a string based on the dogs faces themselves. From a quick glance, we notice they are the following *emojis*:

1. Flushed Face
2. Drooling Face
3. Cowboy Hat Face
4. Woozy Face
5. Anguished Face
6. Pouting Cat Face
7. Confounded Face
8. Squinting Face With Tongue Face

From here, I was kind of stuck and tried several methods. For example, seeing if the first letter of each emoji name was an anagram, seeing if the unicode values of letters had a unique property, seeing if the emojis of the animals who had thier paw down on the table had something in common, etc.

About a few days later of just trying ideas I derived from just staring at the image, I noticed that each animal had a very identifiable amount of chips, as well as identifiable cards. Looking back at the prompt: "You won’t find poker faces here–these poor pups can’t hide their emotions or the cards that cause them," this gives a further hint that the cards themselves are also required to derive some sort of string.

What if, the numerical value of the cards act as an index towards the name? If we apply this idea to all the emojis, using the cards in-order as they are displayed (clockwise) we get something interesting:

1. FlushedFace -> sh,
2. DroolingFace -> if
3. CowboyHatFace -> tb
4. WoozyFace -> yc
5. AnguishedFace -> hi
6. PoutingCat -> pc
7. ConfoundedFace -> ou
8. SquintingFaceWithTongueFace -> nt

shiftbychipcount -> Shift by chip count! Progress! But all that work just for a hint? Well now we know the next step involves the chips themselves, which also narrows down the possible ways we can use the chips, most likely in a similar way we just used the card numbers.

Looking back at the image, each card has a stack of chips next to it, and we clearly need to shift **some letter** by this chip count. Lets try shifting the letters (mod 26) we got from indexing the emoji names by these chip counts in clockwise order once again:

1. FlushedFace -> sh -> s + 1 = t, h + 0 = h
2. DroolingFace -> if -> i + 22 = e, f + 23 = c
3. CowboyHatFace -> tb -> t + 7 = a, b + 12 = n
4. WoozyFace -> yc -> y + 10 = i, c + 11 = n
5. AnguishedFace -> hi -> h + 23 = e, i + 6 = o
6. PoutingCat -> pc -> p + 16 = f, c + 0 = c
7. ConfoundedFace -> ou -> o + 23 = l, u + 0 = u
8. SquintingFaceWithTongueFace -> nt -> n + 14 = b, t + 25 = s

Combine the letters in-order, we get thecanineofclubs -> The Canine of Clubs! This word play gives us the final solution to this problem, Canine of Clubs = K9 of Clubs -> KC, 9C.

Obviously, much of the explanation here makes the puzzle straight forward, but it took over 2 weeks in total of experimenting as well as just staring at the image to get some ideas going, following numerous rabbit holes. It took me 2 days alone just to understand that Canine of Clubs was word play for the actual solution!

The main takeaway however, is that these puzzle solutions are far more elegant in its process of solving, and overthinking quickly took me to time-wasting rabbit holes, instead of just taking exactly what I was given. But was really fun to finally solve my first Jane Street puzzle!

If you want to solve the current one, head over to [Jane Streets puzzle page](https://www.janestreet.com/puzzles/current-puzzle/), they are really fun to solve when you have some time laying around!

In addition, whenever I am able to solve a puzzle, at the end of the month I will make a blog post detailing the solution and steps of solving. Thank you for reading!
