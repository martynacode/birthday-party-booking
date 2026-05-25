# Design Diary

Quick notes on design decisions as I build. Used for the TMA writeup later

## 18 May 2026

**Trust function of a booking system**
The booking system does emotional work alongside transactional work. Even if parents do not remember every detail, seeing allergens upfront signals the venue takes their concerns seriously. They arrive less anxious. This is why thoughful tweaks aren;t scope screep - they build trust.

**Tier-aware allergen messages**
End-to-end testing found that allergen messages mentioned dessert options Gold customers don't get. Rather than branching the code, I added an optional `platinumExtra` field per allergen, only shown for Platinum. Allergens without dessert relevance just leave the field empty. Clean

**Iterative design / Scope creep**
I value iterative improvements when they sharpen something already in scope - small content teaks, copy revisions, conditional logic refinements before code is committed. But there have been moments where I wanted to add something bigger (customer accounts, editable bookings, voucher tracking) and decided to leave it out. Those would have pulled the project away from what I set out to build. Capturing them as future work felt better than fitting them in now.

**Initial implementation**
Initial implementation allows unlimited additional adults and date selection up to several years in advance. Real-world usage testing identified these as edge-case issues: a 25-adult party isn't operationally feasible, and bookings 5 years out exceed reasonable forecast windows. Future iterations would add: a soft cap on additional adults (e.g. max 25, with warning at 15+), and a max booking window of 6 months ahead with friendly messaging about future openings.
