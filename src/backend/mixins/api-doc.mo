mixin () {
  /// Returns the backend's public API documentation as Markdown.
  public query func getApiDoc() : async Text {
    "# Backend API\n\n" #
    "This canister is the backend for a storefront application. It currently exposes " #
    "**no domain data or business endpoints** — it is a minimal composition root that " #
    "provides only the platform authorization surface and the OQL query surface. " #
    "All product, search, and WhatsApp behaviour lives in the frontend.\n\n" #
    "## Public methods\n\n" #
    "### Authorization (from `MixinAuthorization`)\n\n" #
    "- `_initialize_access_control()` — registers the calling principal. The first " #
    "caller to invoke it becomes the **admin**; every subsequent caller becomes a " #
    "regular **user**. Must be called once by a signed-in caller before any " #
    "role-guarded call.\n" #
    "- `getCallerUserRole()` — returns the calling principal's role " #
    "(`#admin` or `#user`).\n" #
    "- `isCallerAdmin()` — returns `true` when the caller is an admin.\n" #
    "- `assignCallerUserRole(user : Principal, role : UserRole)` — admin-only; " #
    "assigns a role to another principal.\n" #
    "- `_internet_identity_sign_in_start()` / `_internet_identity_sign_in_finish(...)` " #
    "— Internet Identity sign-in helpers used by the frontend.\n\n" #
    "### OQL (from `Expose`)\n\n" #
    "- `schema()` — returns the OQL schema. The entity list is currently **empty**, " #
    "so the schema describes no tables.\n" #
    "- `execute(query : Text)` — runs an OQL query. With no entities registered, " #
    "there is nothing to query.\n\n" #
    "### Documentation\n\n" #
    "- `getApiDoc()` — this document. A `query` call; it reads no state and is safe " #
    "to poll.\n\n" #
    "## Authentication and authorization\n\n" #
    "The app's frontend pins an Internet Identity derivation origin, published at " #
    "`/.well-known/ii-derivation-origin` when available. An agent already holding " #
    "the user's Internet Identity authorization derives the correct per-app " #
    "principal against that origin (for example " #
    "`icp identity link web <name> --app <host>`). Such a delegation acts with the " #
    "user's full authority in this app until it expires.\n\n" #
    "Registration is a prerequisite for role-guarded calls. A direct API caller " #
    "must call `_initialize_access_control()` once as a signed-in caller before any " #
    "role-guarded call, including guarded queries. The first initializer receives " #
    "the **admin** role; every subsequent caller receives the **user** role. An " #
    "unregistered or anonymous caller is rejected by the authorization mixin's " #
    "guard.\n\n" #
    "A caller can be unregistered even when the app appears to know it: " #
    "registration happens only when a caller signs in through the app's own " #
    "frontend, so a principal that never did so is unregistered even when it " #
    "belongs to the app's owner. A signed-in caller derived against a different " #
    "origin is a different principal than the one the frontend registered.\n\n" #
    "## Units and encodings\n\n" #
    "- Roles are the `UserRole` variant (`#admin` / `#user`).\n" #
    "- `schema()` returns the OQL schema as a value; `execute()` takes a JSON " #
    "query string and returns JSON rows.\n" #
    "- There are no timestamps, identifiers, or numeric units in the current API.\n\n" #
    "## Lifecycle and polling\n\n" #
    "- `getApiDoc()` and `schema()` are `query` calls: fast, unreplicated, and safe " #
    "to poll.\n" #
    "- `execute()` is a query call. With no entities registered it returns no rows.\n" #
    "- `_initialize_access_control()` is an update call and must be invoked once " #
    "before role-guarded calls.\n\n" #
    "## Mutation retry safety\n\n" #
    "- `_initialize_access_control()` is **not idempotent**: the first call assigns " #
    "admin, later calls assign user. Retrying it after a successful call does not " #
    "re-grant admin.\n" #
    "- `assignCallerUserRole` is idempotent for a given `(user, role)` pair.\n" #
    "- `getApiDoc()`, `schema()`, and `execute()` never mutate state.\n\n" #
    "## Errors and gotchas\n\n" #
    "- Calling a role-guarded method before `_initialize_access_control()` traps.\n" #
    "- The OQL entity list is intentionally empty: there is no persisted domain " #
    "data to query yet, so `execute()` has nothing to answer over.\n" #
    "- `getApiDoc()` returns static Markdown; it does not reflect runtime state.\n"
  };
};
