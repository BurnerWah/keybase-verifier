# Keybase Verifier Worker

This is the source code for the worker I use on most (but not all yet) of my sites to provide Keybase proofs.
It's _very_ simple, since it really only needs to 1 thing.

It pulls the Keybase proof from an r2 store based on its hostname, and then returns that.

It only supports `/.well-known/keybase.txt`, though if you wanted to it would be very simple to add support for `/keybase.txt` as well.

[This (brnr.link/.well-known/keybase.txt)](https://brnr.link/.well-known/keybase.txt) is an example attestation.
