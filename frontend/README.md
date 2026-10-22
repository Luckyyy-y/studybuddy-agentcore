# Local StudyBuddy interface

This is the Express interface used for the recorded workshop demo. It binds to `127.0.0.1:3000` and requires a configured AWS runtime for real responses. See the root [README](../README.md), [setup notes](../docs/setup.md), and [verification limits](../docs/verification.md).

Run `npm ci --ignore-scripts` and `npm run check` for local syntax verification. This does not call AWS. Do not publish or tunnel this server as-is: it has a fixed workshop actor, no user authentication, and no rate limits.
