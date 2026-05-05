/* =============================================================
   Chrome DevTools Demo — COMP 484 HW 10
   Integrated into Rocky the Eridian (Project 2 copy)

   This file demonstrates every example required by the assignment:
   — Message Logging (log, info, warn, error, table, group, custom)
   — Browser-logged messages
   — Network errors (404)
   — TypeError
   — Violation (long-running task)
   — Filtering (level, text, regex, source, user messages)
   — Reproduce a bug
   — Sources UI / Breakpoints
   — Variable inspection (Scope, Watch, Console)
   — Apply a fix
   ============================================================= */

// ─────────────────────────────────────────────────────────────
// SECTION 1 — MESSAGE LOGGING
// Run these in the Console tab, or watch them fire on page load.
// ─────────────────────────────────────────────────────────────

/** 1a. Log Info */
function demoLogInfo() {
  console.info(
    "%c[Rocky DevTools] INFO — Page initialized",
    "color: #4a9eff; font-weight: bold;"
  );
  console.info("Friend_info at startup:", Friend_info);
}

/** 1b. Log Warning */
function demoLogWarning() {
  if (Friend_info.happiness < 20) {
    console.warn(
      "[Rocky DevTools] WARNING — Rocky is unhappy! happiness =",
      Friend_info.happiness
    );
  } else {
    console.warn(
      "[Rocky DevTools] WARNING demo — happiness is fine right now (" +
        Friend_info.happiness +
        "), but this is what a warning looks like."
    );
  }
}

/** 1c. Log Error */
function demoLogError() {
  console.error(
    "[Rocky DevTools] ERROR — Simulated error: Rocky's food supply critically low!"
  );
}

/** 1d. Log Table */
function demoLogTable() {
  console.log("[Rocky DevTools] TABLE — Current Friend stats:");
  console.table([
    { stat: "name",      value: Friend_info.name },
    { stat: "weight",    value: Friend_info.weight    + " kg" },
    { stat: "happiness", value: Friend_info.happiness + " notes/min" },
    { stat: "trust",     value: Friend_info.trust     + " / 100" },
  ]);
}

/** 1e. Log Group */
function demoLogGroup() {
  console.group("[Rocky DevTools] GROUP — Rocky's full status report");
    console.log("Name:      ", Friend_info.name);
    console.log("Weight:    ", Friend_info.weight, "kg");
    console.log("Happiness: ", Friend_info.happiness, "notes/min");
    console.log("Trust:     ", Friend_info.trust, "/ 100");
    console.groupCollapsed("▸ Speech Lines Available");
      console.log("Treat lines:", speechLines.treat);
      console.log("Play lines: ", speechLines.play);
      console.log("Chat lines: ", speechLines.chat);
      console.log("Science lines:", speechLines.science);
    console.groupEnd();
  console.groupEnd();
}

/** 1f. Log Custom (styled with %c) */
function demoLogCustom() {
  console.log(
    "%c★ Rocky the Eridian %c| COMP 484 DevTools Demo",
    "background:#3d5c28; color:#e8dfd0; font-size:14px; font-weight:bold; padding:4px 8px; border-radius:4px 0 0 4px;",
    "background:#1a2b42; color:#c97545; font-size:14px; padding:4px 8px; border-radius:0 4px 4px 0;"
  );
  console.log(
    "%cFriend stats at a glance → happiness: %d | weight: %d | trust: %d",
    "color:#7fa85a; font-style:italic;",
    Friend_info.happiness,
    Friend_info.weight,
    Friend_info.trust
  );
}

/** 1g. View messages logged by the browser (uses console.count + console.assert) */
function demoBrowserMessages() {
  // console.count() shows how many times a label has been called — the
  // browser itself uses a similar mechanism for repeated messages.
  console.count("[Rocky] clickedTreatButton calls");
  console.count("[Rocky] clickedTreatButton calls");

  // console.assert() prints only when the condition is FALSE —
  // the browser uses this style for constraint violations.
  console.assert(Friend_info.happiness >= 0, "happiness must be non-negative");
  console.assert(false, "[Rocky DevTools] ASSERT demo — this always fires to show browser-style messages");
}

// ─────────────────────────────────────────────────────────────
// SECTION 2 — CAUSE ERRORS (run from the DevTools panel button)
// ─────────────────────────────────────────────────────────────

/** 2a. Cause a 404 Network Error */
function cause404() {
  console.log("[Rocky DevTools] Triggering 404 — fetching a non-existent resource...");
  // fetch() will appear in the Network tab as a failed (red) request
  fetch("images/does-not-exist.png")
    .then(function (response) {
      if (!response.ok) {
        console.warn(
          "[Rocky DevTools] 404 confirmed — HTTP status:",
          response.status,
          response.url
        );
      }
    })
    .catch(function (err) {
      console.error("[Rocky DevTools] Network fetch error:", err);
    });

  // Also create a broken image tag so the error shows in the Console panel
  var img = document.createElement("img");
  img.src = "images/does-not-exist.png";
  img.style.display = "none";
  document.body.appendChild(img);
}

/** 2b. Cause a TypeError */
function causeTypeError() {
  console.log("[Rocky DevTools] Triggering TypeError...");
  try {
    // Intentional bug: calling .toUpperCase() on a number
    var badValue = Friend_info.weight.toUpperCase(); // TypeError!
    console.log(badValue);
  } catch (e) {
    console.error("[Rocky DevTools] TypeError caught:", e.message);
    // Re-throw so DevTools also shows an uncaught stack trace in the panel
    // (comment the line below out if you don't want the red error banner)
    // throw e;
  }
}

/** 2c. Cause a Violation (long-running synchronous task) */
function causeViolation() {
  console.log("[Rocky DevTools] Starting long synchronous task — watch for [Violation] in Console...");
  // A synchronous loop that blocks the main thread for >100 ms triggers a
  // "Forced reflow" or "Long running task" violation message from the browser.
  var start = Date.now();
  // eslint-disable-next-line no-empty
  while (Date.now() - start < 200) { /* busy-wait intentionally */ }
  console.log("[Rocky DevTools] Long task done — violation should appear above.");
}

// ─────────────────────────────────────────────────────────────
// SECTION 3 — FILTER MESSAGES
// All messages below have distinctive labels so you can use the
// Console's filter bar to isolate each category.
// ─────────────────────────────────────────────────────────────

function demoFilterMessages() {
  // Filter by log level: change the dropdown from "Default levels" to see only
  // Verbose, Info, Warnings, or Errors.
  console.log  ("[FILTER-LOG]     This is a plain log — visible at Default level");
  console.info ("[FILTER-INFO]    This is info — visible at Info level");
  console.warn ("[FILTER-WARN]    This is a warning — visible at Warning level");
  console.error("[FILTER-ERROR]   This is an error — visible at Error level");

  // Filter by text: type "FILTER-WARN" in the filter box to show only warnings.

  // Filter by regular expression: enable regex (the /.*/ toggle) and type
  //   FILTER-(WARN|ERROR)  to see only warnings and errors.
  console.log("[FILTER-REGEX]   Use regex FILTER-(WARN|ERROR) to match this and the warning/error above.");

  // Filter by message source: in the Sidebar (⋮ → Show sidebar), click
  // "user messages" to see only messages you wrote (not browser internals).
  console.log("[FILTER-SOURCE]  This message is from devtools-demo.js (user code, not a browser extension).");

  // Filter by user messages: the Sidebar → "user messages" category shows
  // everything logged by page scripts vs. browser-generated messages.
  console.log("[FILTER-USER]    User message — appears under 'user messages' in the sidebar.");
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — BUG REPRODUCTION + FIX
// The original script.js had a subtle bug: clicking "Chat" enough
// times drives happiness below 0, but the guard only ran AFTER
// stats were already written to the DOM, so the UI briefly showed
// negative numbers.  We reproduce and then fix that here.
// ─────────────────────────────────────────────────────────────

/** 4a. Reproduce the bug — call this from the Console */
function reproduceBug() {
  console.group("[Rocky DevTools] BUG REPRODUCTION — happiness goes negative before guard runs");

  // Save original state
  var savedHappiness = Friend_info.happiness;

  // Drive happiness very low
  Friend_info.happiness = 3;
  console.log("Before buggy update, happiness =", Friend_info.happiness);

  // ── BUGGY version (mirrors what the original code did) ──
  // updateFriendInfoInHtml() runs FIRST, writing the negative value;
  // checkWeightAndHappinessBeforeUpdating() clamps it AFTERWARDS.
  Friend_info.happiness -= 5;            // now -2
  updateFriendInfoInHtml();              // BUG: renders "-2" to the DOM
  console.warn("[Rocky DevTools] DOM now shows happiness =", $(".happiness").text(), "(negative!)");
  checkWeightAndHappinessBeforeUpdating(); // clamped to 0, but DOM already showed -2
  updateFriendInfoInHtml();              // corrected — renders 0

  console.log("After guard runs, happiness =", Friend_info.happiness, "(DOM now shows", $(".happiness").text(), ")");

  // Restore
  Friend_info.happiness = savedHappiness;
  updateFriendInfoInHtml();
  console.groupEnd();
}

/** 4b. Apply the fix — guard runs BEFORE writing to DOM */
function applyFix() {
  console.group("[Rocky DevTools] FIX APPLIED — guard now runs before DOM update");
  var savedHappiness = Friend_info.happiness;

  Friend_info.happiness = 3;
  console.log("Before fixed update, happiness =", Friend_info.happiness);

  Friend_info.happiness -= 5;                    // now -2
  checkWeightAndHappinessBeforeUpdating();        // FIX: clamp FIRST (→ 0)
  updateFriendInfoInHtml();                       // DOM always sees 0+
  console.log("DOM shows happiness =", $(".happiness").text(), "(never negative)");

  Friend_info.happiness = savedHappiness;
  updateFriendInfoInHtml();
  console.groupEnd();
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — SOURCES UI / BREAKPOINTS DEMO
// ─────────────────────────────────────────────────────────────

/**
 * debuggableAction()
 * 
 * HOW TO USE THE SOURCES UI WITH THIS FUNCTION:
 *
 * 1. Open DevTools → Sources tab.
 * 2. In the file tree (left pane) open devtools-demo.js.
 * 3. Click the line number next to "var step = 1;" below to set a
 *    line-of-code breakpoint (the gutter turns blue).
 * 4. Click "Run Debuggable Action" in the page.
 * 5. Execution pauses at the breakpoint.
 *
 * GET FAMILIAR WITH THE SOURCES UI:
 *   • Left pane   → Page / Filesystem / Overrides / Content scripts
 *   • Centre pane → Source code with line numbers + breakpoint gutters
 *   • Right pane  → Breakpoints list, Scope, Watch, Call stack
 *
 * CHECK VARIABLE VALUES:
 *   • Hover over any variable in the source to see its current value.
 *   • Or type it in the Console panel while paused.
 *
 * THE SCOPE PANE (right panel → Scope):
 *   • Local  — variables declared inside debuggableAction()
 *   • Closure — Friend_info, speechLines (from outer script.js scope)
 *   • Global  — window, document, $, Tone, etc.
 *
 * WATCH EXPRESSIONS:
 *   • In the Watch panel click ＋ and type:  Friend_info.happiness
 *   • It updates live as you step through with F10 (Step over).
 *
 * THE CONSOLE (while paused):
 *   • The Console is still live — type Friend_info to inspect it.
 *   • Or type: step * 10   to evaluate an expression mid-execution.
 *
 * APPLY A FIX:
 *   • While paused, right-click a line → "Add logpoint" to log without
 *     stopping.  Or edit the source in Overrides and reload.
 */
function debuggableAction() {
  /* ← Set a breakpoint on the line below */
  var step = 1;                                      // line-of-code breakpoint here
  console.log("[Rocky DevTools] debuggableAction step", step);

  var localHappiness = Friend_info.happiness;        // check in Scope pane
  step = 2;
  console.log("[Rocky DevTools] step", step, "| localHappiness =", localHappiness);

  var localWeight = Friend_info.weight;              // add to Watch Expressions
  step = 3;
  console.log("[Rocky DevTools] step", step, "| localWeight =", localWeight);

  var computed = localHappiness * 0.5 + localWeight * 0.3;
  step = 4;
  console.log("[Rocky DevTools] step", step, "| computed score =", computed.toFixed(2));

  // Simulate a potential null-dereference to practise breakpoint debugging
  var maybeNull = null;
  if (localHappiness > 0) {
    maybeNull = { status: "Rocky is ok", score: computed };
  }
  step = 5;
  // Hover over maybeNull here while paused to see its value
  console.log("[Rocky DevTools] step", step, "| maybeNull =", maybeNull);
  console.log("[Rocky DevTools] debuggableAction complete.");
}

// ─────────────────────────────────────────────────────────────
// SECTION 6 — PANEL WIRING (buttons injected into the page)
// ─────────────────────────────────────────────────────────────

$(function () {
  // Run all logging demos on page load so the Console is pre-populated
  demoLogInfo();
  demoLogCustom();
  demoLogGroup();
  demoLogTable();

  // Wire the DevTools panel buttons
  $("#btn-log-info"   ).click(demoLogInfo);
  $("#btn-log-warn"   ).click(demoLogWarning);
  $("#btn-log-error"  ).click(demoLogError);
  $("#btn-log-table"  ).click(demoLogTable);
  $("#btn-log-group"  ).click(demoLogGroup);
  $("#btn-log-custom" ).click(demoLogCustom);
  $("#btn-browser-msg").click(demoBrowserMessages);
  $("#btn-404"        ).click(cause404);
  $("#btn-typeerror"  ).click(causeTypeError);
  $("#btn-violation"  ).click(causeViolation);
  $("#btn-filter"     ).click(demoFilterMessages);
  $("#btn-bug"        ).click(reproduceBug);
  $("#btn-fix"        ).click(applyFix);
  $("#btn-debug"      ).click(debuggableAction);

  console.log(
    "%c[Rocky DevTools] All demo buttons wired. Open DevTools (F12) and explore!",
    "color:#c97545; font-weight:bold;"
  );
});
