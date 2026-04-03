# Design Overview

Passwords are treated as trust signals, not binary gates.

The system:
- evaluates credential trust continuously
- adapts hash cost over time
- migrates algorithms silently
- limits blast radius of compromise
- integrates with session trust engines

Security decisions are probabilistic and policy-driven,
not threshold-based.