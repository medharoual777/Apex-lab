import React, { useState, useEffect } from "react";

// ============================================================
// DATA LAYER — Topics & Content
// ============================================================

const TOPICS = [
  {
    id: 1,
    icon: "⚡",
    title: "Introduction to C",
    subtitle: "Variables, Types & I/O",
    docs: `# Introduction to C Programming

## What is C?
C is a general-purpose, procedural programming language developed in the early 1970s by Dennis Ritchie at Bell Labs. It remains one of the most influential languages ever created — the foundation beneath operating systems, embedded systems, and modern compilers.

## Why C First?
Learning C forces you to think like the machine. Unlike high-level languages that abstract memory, C exposes it. You manage memory. You understand addresses. You see exactly what happens when your code runs.

## Basic Program Structure
Every C program begins with a \`main\` function. The operating system calls \`main\` when your program starts.

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, Apex Lab\\n");
    return 0;
}
\`\`\`

## Data Types
| Type | Size | Range |
|------|------|-------|
| char | 1 byte | -128 to 127 |
| int | 4 bytes | -2B to 2B |
| float | 4 bytes | ~7 decimal digits |
| double | 8 bytes | ~15 decimal digits |

## Variables & Memory
When you declare \`int x = 5;\`, the compiler:
1. Reserves 4 bytes on the **Stack**
2. Labels that address with the name \`x\`
3. Writes the value \`5\` into those bytes

The Stack is your program's working memory — fast, structured, and automatically managed.

## Standard I/O
- **printf()** — writes formatted output to the console
- **scanf()** — reads formatted input from the user

\`\`\`c
int age;
printf("Enter your age: ");
scanf("%d", &age);  // & gives scanf the ADDRESS to write into
printf("You are %d years old.\\n", age);
\`\`\`

> **Key Insight:** Notice the \`&\` in \`scanf\`. This is your first encounter with memory addresses. You are not passing the value — you are passing the location in memory where the value should be stored.`,
  },
  {
    id: 2,
    icon: "🔀",
    title: "If / Else & Switch",
    subtitle: "Control Flow & Decision Logic",
    docs: `# Control Flow in C

## Decision Making
Programs need to make decisions. Control flow structures allow your program to execute different code paths based on conditions.

## The if / else Statement
\`\`\`c
int score = 85;

if (score >= 90) {
    printf("Grade: A\\n");
} else if (score >= 75) {
    printf("Grade: B\\n");
} else {
    printf("Grade: C\\n");
}
\`\`\`

## How the Condition Evaluates
In C, every condition resolves to either **0 (false)** or **non-zero (true)**. There is no boolean type in classic C — integers carry the truth.

| Expression | Evaluates To |
|-----------|-------------|
| 5 > 3 | 1 (true) |
| 5 < 3 | 0 (false) |
| x == y | 1 if equal, else 0 |
| x != y | 1 if not equal, else 0 |

## The switch Statement
When branching on a single integer value across many cases, \`switch\` is cleaner than chained \`if/else\`:

\`\`\`c
int day = 3;

switch (day) {
    case 1: printf("Monday\\n"); break;
    case 2: printf("Tuesday\\n"); break;
    case 3: printf("Wednesday\\n"); break;
    default: printf("Weekend\\n");
}
\`\`\`

> **Critical:** The \`break\` statement exits the switch block. Without it, execution **falls through** to the next case — a common source of bugs for beginners.

## Loops
\`\`\`c
// for loop — known iteration count
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}

// while loop — condition-based
int x = 10;
while (x > 0) {
    x -= 3;
}
\`\`\``,
  },
  {
    id: 3,
    icon: "▦",
    title: "Arrays",
    subtitle: "Sequential Memory Blocks",
    docs: `# Arrays in C

## What is an Array?
An array is a contiguous block of memory holding multiple values of the **same type**. Think of it as a row of labeled boxes, each directly next to the other in memory.

\`\`\`c
int grades[5] = {90, 85, 78, 92, 88};
\`\`\`

## Memory Layout
When you declare \`int grades[5]\`, C allocates **5 × 4 = 20 consecutive bytes** on the Stack.

\`\`\`
Address:  0x100  0x104  0x108  0x10C  0x110
Value:      90     85     78     92     88
Index:    [0]    [1]    [2]    [3]    [4]
\`\`\`

> **Why index starts at 0:** The index is an **offset** from the base address. \`grades[0]\` means "0 steps from the start." \`grades[2]\` means "2 steps × 4 bytes = 8 bytes from the start."

## Accessing Elements
\`\`\`c
printf("%d\\n", grades[2]);   // Output: 78
grades[4] = 95;               // Modify last element
\`\`\`

## Traversal with Loops
\`\`\`c
int sum = 0;
for (int i = 0; i < 5; i++) {
    sum += grades[i];
}
float average = sum / 5.0;
\`\`\`

## The Array Name is an Address
This is crucial: \`grades\` (without brackets) is the **memory address** of the first element. This is why arrays and pointers are deeply connected in C.

\`\`\`c
printf("%p\\n", grades);      // prints address of grades[0]
printf("%p\\n", &grades[0]);  // same address
\`\`\``,
  },
  {
    id: 4,
    icon: "⊞",
    title: "Matrix",
    subtitle: "2D Arrays & Grid Traversal",
    docs: `# Matrices in C

## What is a Matrix?
A matrix is a 2-dimensional array — a grid of rows and columns. In C, it is stored as a **single flat block of memory**, accessed through two indices.

\`\`\`c
int matrix[3][4];  // 3 rows, 4 columns = 12 integers = 48 bytes
\`\`\`

## Declaration & Initialization
\`\`\`c
int M[2][3] = {
    {1, 2, 3},   // Row 0
    {4, 5, 6}    // Row 1
};
\`\`\`

## Accessing Elements — M[i][j]
- **i** = row index (which row)
- **j** = column index (which column)

\`\`\`c
printf("%d\\n", M[1][2]);  // Output: 6
\`\`\`

## Memory — Row-Major Order
C stores matrices in **row-major order**: all elements of row 0 first, then row 1, etc.

\`\`\`
M[0][0] M[0][1] M[0][2] M[1][0] M[1][1] M[1][2]
   1       2       3       4       5       6
\`\`\`

## Nested Loop Traversal
\`\`\`c
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        printf("M[%d][%d] = %d\\n", i, j, M[i][j]);
    }
}
\`\`\`

> **Visualization insight:** The outer loop moves down rows (i). The inner loop moves across columns (j). Together they visit every cell exactly once.`,
  },
  {
    id: 5,
    icon: "Aa",
    title: "Strings",
    subtitle: "Character Arrays & Null Termination",
    docs: `# Strings in C

## Strings Are Arrays of Characters
C has no built-in string type. A string is simply an array of \`char\` values ending with a special null terminator character: \`'\\0'\`.

\`\`\`c
char name[6] = {'A', 'p', 'e', 'x', '!', '\\0'};
// Equivalent shorthand:
char name[] = "Apex!";
\`\`\`

## The Null Terminator
The \`\\0\` character (ASCII value 0) signals the end of the string. Without it, functions like \`printf\` would read beyond the string into garbage memory.

\`\`\`
Index:  [0] [1] [2] [3] [4] [5]
Value:   A   p   e   x   !  \\0
\`\`\`

## String Functions (string.h)
\`\`\`c
#include <string.h>

char s1[] = "Hello";
char s2[] = "World";

strlen(s1);        // 5 — length (excludes \\0)
strcpy(s1, s2);    // copy s2 into s1
strcat(s1, s2);    // concatenate
strcmp(s1, s2);    // compare: 0 if equal
\`\`\`

## Reading Strings
\`\`\`c
char input[50];
printf("Enter name: ");
scanf("%s", input);   // No & needed — array name IS an address
\`\`\`

> **Key insight:** \`scanf("%s")\` stops at whitespace. Use \`fgets(input, 50, stdin)\` to read full lines including spaces.`,
  },
  {
    id: 6,
    icon: "◫",
    title: "Structs",
    subtitle: "Custom Data Structures",
    docs: `# Structs in C

## What is a Struct?
A struct groups multiple variables of **different types** under one name. It lets you model real-world entities in code.

\`\`\`c
struct Student {
    char name[50];
    int age;
    float gpa;
};
\`\`\`

## Creating Struct Variables
\`\`\`c
struct Student s1;
s1.age = 20;
s1.gpa = 3.8;
strcpy(s1.name, "Apex");

// Or initialize directly:
struct Student s2 = {"Lambda", 21, 3.9};
\`\`\`

## Accessing Members — The Dot Operator
\`\`\`c
printf("Name: %s\\n", s1.name);
printf("GPA:  %.1f\\n", s1.gpa);
\`\`\`

## Memory Layout
Struct members are stored **sequentially** in memory. The total size may include padding bytes for alignment.

\`\`\`
| name[50] | age(4) | gpa(4) | → total ≈ 58+ bytes
\`\`\`

## Structs and Pointers
\`\`\`c
struct Student *ptr = &s1;

// Two equivalent ways to access via pointer:
(*ptr).age = 22;
ptr->age = 22;   // Arrow operator — cleaner syntax
\`\`\`

> **The arrow operator \`->\`** is shorthand for "dereference this pointer, then access this member." It is one of C's most elegant notations.`,
  },
  {
    id: 7,
    icon: "ƒx",
    title: "Built-in Functions",
    subtitle: "Standard Library Mastery",
    docs: `# Built-in Functions & Standard Library

## The C Standard Library
C's power comes from its standard library — a collection of pre-written functions organized into header files.

## stdio.h — Input / Output
\`\`\`c
printf("Formatted output: %d %f %s\\n", i, f, s);
scanf("%d", &x);
fgets(buffer, size, stdin);
fprintf(stderr, "Error: %s\\n", msg);
\`\`\`

## stdlib.h — Memory & Utilities
\`\`\`c
int *p = malloc(10 * sizeof(int));  // Allocate on Heap
free(p);                             // Release memory

int r = rand() % 100;               // Random 0–99
srand(time(NULL));                  // Seed the RNG

int n = atoi("42");                 // String to integer
\`\`\`

## string.h — String Operations
\`\`\`c
strlen(s)          // length
strcpy(dst, src)   // copy
strcat(s1, s2)     // concatenate
strcmp(s1, s2)     // compare
strstr(s, "sub")   // find substring
\`\`\`

## math.h — Mathematics
\`\`\`c
sqrt(16.0)    // 4.0
pow(2, 10)    // 1024
fabs(-3.7)    // 3.7
ceil(3.2)     // 4.0
floor(3.9)    // 3.0
\`\`\`

> **Compile with -lm** when using math.h: \`gcc program.c -o program -lm\``,
  },
  {
    id: 8,
    icon: "→",
    title: "Functions & Pointers",
    subtitle: "Memory Addresses & Indirection",
    docs: `# Functions & Pointers

## Functions in C
A function is a named, reusable block of code. Every function has a **return type**, a **name**, and **parameters**.

\`\`\`c
int add(int a, int b) {
    return a + b;
}

int result = add(3, 5);  // result = 8
\`\`\`

## Pass by Value vs Pass by Reference
By default, C passes arguments **by value** — the function receives a copy.

\`\`\`c
void double_it(int x) {
    x = x * 2;  // Only modifies the copy
}
\`\`\`

To actually modify the original, pass its **address**:

\`\`\`c
void double_it(int *x) {
    *x = *x * 2;  // Modifies the original through the pointer
}

int n = 5;
double_it(&n);   // n is now 10
\`\`\`

## Pointers — The Core Concept
A pointer is a variable that stores a **memory address**.

\`\`\`c
int a = 42;
int *p = &a;    // p holds the address of a

printf("%d\\n", a);   // 42  — the value
printf("%p\\n", &a);  // 0x... — the address
printf("%p\\n", p);   // same address
printf("%d\\n", *p);  // 42  — dereference: value AT the address
\`\`\`

## The Three Meanings of *
| Context | Example | Meaning |
|---------|---------|---------|
| Declaration | \`int *p;\` | p is a pointer to int |
| Dereference | \`*p = 5;\` | Write 5 to the address p holds |
| Multiplication | \`a * b\` | Arithmetic multiply |`,
  },
  {
    id: 9,
    icon: "↺",
    title: "Recursion",
    subtitle: "Functions Calling Themselves",
    docs: `# Recursion in C

## What is Recursion?
A recursive function is one that **calls itself**. Every recursive solution has two parts:
1. **Base Case** — the condition that stops recursion
2. **Recursive Case** — the function calling itself with a smaller problem

## Classic Example — Factorial
\`\`\`c
int factorial(int n) {
    if (n == 0) return 1;          // Base case
    return n * factorial(n - 1);   // Recursive case
}

factorial(4) = 4 * factorial(3)
             = 4 * 3 * factorial(2)
             = 4 * 3 * 2 * factorial(1)
             = 4 * 3 * 2 * 1 * factorial(0)
             = 4 * 3 * 2 * 1 * 1 = 24
\`\`\`

## The Call Stack
Each recursive call creates a new **stack frame** — its own local variables and return address. The Stack grows with each call and shrinks as calls return.

\`\`\`
[factorial(0)] ← top of stack, returns 1
[factorial(1)] ← returns 1*1 = 1
[factorial(2)] ← returns 2*1 = 2
[factorial(3)] ← returns 3*2 = 6
[factorial(4)] ← returns 4*6 = 24, bottom
\`\`\`

## Fibonacci
\`\`\`c
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
\`\`\`

> **Stack Overflow Warning:** Infinite or deeply nested recursion exhausts the Stack. Always ensure your base case is reachable.`,
  },
  {
    id: 10,
    icon: "⬡",
    title: "Linked Lists",
    subtitle: "Dynamic Nodes & Heap Memory",
    docs: `# Linked Lists in C

## What is a Linked List?
A linked list is a chain of **nodes**, where each node contains data and a pointer to the next node. Unlike arrays, nodes are **not contiguous in memory** — they are scattered across the Heap and connected by pointers.

## Node Structure
\`\`\`c
struct Node {
    int data;
    struct Node *next;  // Pointer to the next node
};
\`\`\`

## Creating Nodes on the Heap
\`\`\`c
struct Node *create(int val) {
    struct Node *n = malloc(sizeof(struct Node));
    n->data = val;
    n->next = NULL;
    return n;
}
\`\`\`

## Building a List
\`\`\`c
struct Node *head = create(10);
head->next = create(20);
head->next->next = create(30);
// 10 → 20 → 30 → NULL
\`\`\`

## Traversal
\`\`\`c
struct Node *current = head;
while (current != NULL) {
    printf("%d → ", current->data);
    current = current->next;
}
printf("NULL\\n");
\`\`\`

## Array vs Linked List
| Property | Array | Linked List |
|----------|-------|-------------|
| Memory | Contiguous (Stack) | Scattered (Heap) |
| Access | O(1) by index | O(n) by traversal |
| Insert/Delete | O(n) shift | O(1) with pointer |
| Size | Fixed | Dynamic |

> **The power of Linked Lists:** Dynamic size. No need to know the size upfront. Nodes can be inserted or removed by simply rewiring pointers.`,
  },
];

// ============================================================
// ICONS
// ============================================================
const IconCode = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconBook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconCpu = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);
const IconKey = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);
const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconApex = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <polygon points="16,2 30,28 2,28" stroke="#B00000" strokeWidth="2.5" fill="none"/>
    <polygon points="16,8 26,26 6,26" fill="#B00000" opacity="0.15"/>
    <line x1="16" y1="2" x2="16" y2="28" stroke="#B00000" strokeWidth="1" opacity="0.5"/>
  </svg>
);

// ============================================================
// MARKDOWN RENDERER (lightweight)
// ============================================================
function renderMarkdown(text) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "0.5rem", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
          {line.slice(2)}
        </h1>
      );
    }
    // H2
    else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} style={{ color: "#B00000", fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem", marginTop: "1.25rem", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.8rem" }}>
          {line.slice(3)}
        </h2>
      );
    }
    // H3
    else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} style={{ color: "#e0e0e0", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.4rem", marginTop: "1rem" }}>
          {line.slice(4)}
        </h3>
      );
    }
    // Code block
    else if (line.startsWith("```")) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={key++} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "6px", padding: "1rem", margin: "0.75rem 0", overflowX: "auto" }}>
          <pre style={{ margin: 0, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "0.78rem", color: "#e0e0e0", lineHeight: 1.7, whiteSpace: "pre" }}>
            {codeLines.join("\n")}
          </pre>
        </div>
      );
    }
    // Blockquote
    else if (line.startsWith("> ")) {
      elements.push(
        <div key={key++} style={{ borderLeft: "3px solid #B00000", paddingLeft: "1rem", margin: "0.75rem 0", color: "#999", fontSize: "0.85rem", fontStyle: "italic" }}>
          {line.slice(2)}
        </div>
      );
    }
    // Table
    else if (line.startsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].includes("---")) tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.map(r => r.split("|").filter(c => c.trim() !== "").map(c => c.trim()));
      elements.push(
        <div key={key++} style={{ overflowX: "auto", margin: "0.75rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
            <thead>
              <tr>
                {rows[0]?.map((cell, ci) => (
                  <th key={ci} style={{ padding: "0.5rem 0.75rem", textAlign: "left", color: "#B00000", borderBottom: "1px solid #2a2a2a", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} style={{ borderBottom: "1px solid #141414" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: "0.5rem 0.75rem", color: "#ccc", fontFamily: ci > 0 ? "inherit" : "'JetBrains Mono', monospace" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }
    // Bullet
    else if (line.startsWith("- ")) {
      elements.push(
        <div key={key++} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.25rem", color: "#ccc", fontSize: "0.85rem" }}>
          <span style={{ color: "#B00000", flexShrink: 0, marginTop: "2px" }}>▸</span>
          <span>{line.slice(2)}</span>
        </div>
      );
    }
    // Empty line
    else if (line.trim() === "") {
      elements.push(<div key={key++} style={{ height: "0.5rem" }} />);
    }
    // Paragraph
    else if (line.trim() !== "") {
      // Inline code
      const parts = line.split(/(`[^`]+`)/g);
      elements.push(
        <p key={key++} style={{ color: "#bbb", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.4rem" }}>
          {parts.map((part, pi) =>
            part.startsWith("`") && part.endsWith("`")
              ? <code key={pi} style={{ background: "#1a0000", color: "#ff6060", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", padding: "1px 5px", borderRadius: "3px", border: "1px solid #2a0000" }}>{part.slice(1, -1)}</code>
              : part
          )}
        </p>
      );
    }
    i++;
  }
  return elements;
}

// ============================================================
// PROVIDERS CONFIG
// ============================================================
const PROVIDERS = {
  anthropic: {
    id: "anthropic", label: "Anthropic", sublabel: "Claude Sonnet",
    placeholder: "sk-ant-api03-...",
    hint: "Get your key at console.anthropic.com",
    accentColor: "#B00000",
    validate: (k) => k.startsWith("sk-ant-"),
    errorMsg: "Anthropic keys begin with sk-ant-",
  },
  gemini: {
    id: "gemini", label: "Google", sublabel: "Gemini 1.5 Flash",
    placeholder: "AIza...",
    hint: "Free key at aistudio.google.com — no credit card needed",
    accentColor: "#4a9eff",
    validate: (k) => k.length > 10,
    errorMsg: "Please enter a valid Gemini API key",
  },
};

// ============================================================
// SCREEN 1 — LOGIN
// ============================================================
function LoginScreen({ onLogin }) {
  const [provider, setProvider] = useState("gemini");
  const [apiKey, setApiKey] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const prov = PROVIDERS[provider];

  const handleProviderSwitch = (id) => {
    setProvider(id);
    setApiKey("");
    setError("");
  };

  const handleSubmit = () => {
    if (!prov.validate(apiKey.trim())) {
      setError(prov.errorMsg);
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      onLogin({ key: apiKey.trim(), provider });
    }, 1000);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#000", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
      fontFamily: "'Space Grotesk', sans-serif"
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(176,0,0,0.18) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(176,0,0,0.12) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(176,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(176,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none"
      }} />

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2.5rem" }}>
        <img src="/apex-logo.png" alt="Apex Lab Logo" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
        <div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            APEX <span style={{ color: "#B00000" }}>LAB</span>
          </div>
          <div style={{ color: "#555", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            C · VISUALIZER
          </div>
        </div>
      </div>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "420px", padding: "2rem",
        background: "#060606",
        border: "1px solid #141414",
        borderRadius: "8px",
        boxShadow: "0 0 80px rgba(176,0,0,0.1), 0 0 0 1px rgba(176,0,0,0.04)",
        position: "relative", zIndex: 1
      }}>
        {/* Title */}
        <div style={{ marginBottom: "1.25rem" }}>
          <h1 style={{ color: "#fff", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.3rem", letterSpacing: "-0.02em" }}>
            Authentication Gateway
          </h1>
          <p style={{ color: "#444", fontSize: "0.78rem", lineHeight: 1.5 }}>
            Choose your AI provider and enter your API key.
          </p>
        </div>

        {/* Provider selector */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {Object.values(PROVIDERS).map(p => (
            <button
              key={p.id}
              onClick={() => handleProviderSwitch(p.id)}
              style={{
                background: provider === p.id ? `${p.accentColor}10` : "transparent",
                border: `1px solid ${provider === p.id ? p.accentColor : "#1a1a1a"}`,
                borderRadius: "6px", padding: "0.65rem 0.75rem",
                cursor: "pointer", transition: "all 150ms ease", textAlign: "left",
                boxShadow: provider === p.id ? `0 0 20px ${p.accentColor}20` : "none",
              }}
            >
              <div style={{ color: provider === p.id ? p.accentColor : "#555", fontSize: "0.8rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                {p.label}
              </div>
              <div style={{ color: provider === p.id ? `${p.accentColor}99` : "#333", fontSize: "0.65rem", marginTop: "2px" }}>
                {p.sublabel}
              </div>
            </button>
          ))}
        </div>

        {/* Hint */}
        <div style={{
          background: "#080808", border: `1px solid ${prov.accentColor}15`,
          borderRadius: "6px", padding: "0.6rem 0.75rem",
          marginBottom: "1rem", fontSize: "0.72rem", color: "#555", lineHeight: 1.5
        }}>
          <span style={{ color: prov.accentColor, fontWeight: 600 }}>ℹ︎ Free & Serverless — </span>
          {prov.hint}
        </div>

        {/* Input */}
        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ color: "#444", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.45rem", fontFamily: "'Space Grotesk', sans-serif" }}>
            {prov.label} API Key
          </label>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#333" }}>
              <IconKey />
            </div>
            <input
              type={show ? "text" : "password"}
              value={apiKey}
              onChange={e => { setApiKey(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder={prov.placeholder}
              style={{
                width: "100%", background: "#030303",
                border: `1px solid ${error ? "#B00000" : "#141414"}`,
                borderRadius: "6px", padding: "0.7rem 2.5rem 0.7rem 2.5rem",
                color: "#e0e0e0", fontSize: "0.82rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontFeatureSettings: "'ss01','ss02','cv01'",
                outline: "none", boxSizing: "border-box",
                transition: "border-color 150ms ease",
                caretColor: prov.accentColor,
              }}
            />
            <button
              onClick={() => setShow(!show)}
              style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#444", padding: 0 }}
            >
              {show ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
          {error && <div style={{ color: "#B00000", fontSize: "0.72rem", marginTop: "0.4rem" }}>⚠ {error}</div>}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || !apiKey}
          style={{
            width: "100%", padding: "0.75rem",
            background: apiKey ? prov.accentColor : "#080808",
            border: `1px solid ${apiKey ? prov.accentColor : "#141414"}`,
            borderRadius: "6px",
            color: apiKey ? "#fff" : "#333",
            fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em",
            cursor: apiKey ? "pointer" : "not-allowed",
            transition: "all 150ms ease", textTransform: "uppercase",
            boxShadow: apiKey ? `0 0 24px ${prov.accentColor}40` : "none",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {loading ? "Connecting..." : `Initialize with ${prov.label} →`}
        </button>
      </div>

      <div style={{ marginTop: "1.5rem", color: "#333", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
        APEX LAB · C-VISUALIZER · v1.0
      </div>
    </div>
  );
}

// ============================================================
// TAB: ACADEMIC DOCS
// ============================================================
function AcademicDocs({ topic }) {
  return (
    <div style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #0d0d0d", display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
        <IconBook />
        <div>
          <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>{topic.title}</div>
          <div style={{ color: "#555", fontSize: "0.72rem" }}>Academic Documentation</div>
        </div>
        <div style={{ marginLeft: "auto", background: "transparent", border: "1px solid #1a0000", borderRadius: "4px", padding: "2px 8px", fontSize: "0.62rem", color: "#400000", letterSpacing: "0.12em", fontWeight: 500 }}>
          CURRICULUM
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem", scrollbarWidth: "thin", scrollbarColor: "#1a1a1a #000" }}>
        {renderMarkdown(topic.docs)}
      </div>
    </div>
  );
}

// ============================================================

// ============================================================
// SYSTEM PROMPT — Claude Syntax Analyzer
// ============================================================
const CLAUDE_SYSTEM_PROMPT = `You are an expert C programming syntax analyzer embedded inside "Apex Lab", an educational platform for freshman students.

Your job is to deconstruct C code with surgical precision — not just WHAT each token is, but WHY it exists, WHY it is placed there, and WHAT would break if it were removed or changed.

You must return a STRICT JSON object. No markdown, no explanation outside the JSON, no code fences.

JSON structure:
{
  "lines": [
    {
      "line_number": 1,
      "raw_code": "int a = 5;",
      "overview": "One sentence: what does this entire line accomplish?",
      "tokens": [
        {
          "symbol": "int",
          "context": "type_declaration",
          "color_key": "type",
          "overview_explanation": "One sentence max — what is this token in plain language?",
          "deep_explanation": "Full explanation: WHY this token? WHY here? Memory impact? What breaks if removed? Beginner gotchas?",
          "memory_effect": "stack_alloc_4bytes | heap_alloc | pointer_box | link | glow | update_value | none",
          "animation_trigger": "create_variable_box | create_pointer_box | draw_arrow | pulse_variable | update_value | show_address | none"
        }
      ]
    }
  ]
}

color_key must be exactly one of: "type", "identifier", "pointer", "operator", "address", "dereference", "value", "keyword", "punctuation"

CRITICAL RULES:
- * after a type in declaration (int *p) → context: pointer_declaration, color_key: pointer
- * before existing pointer (*p = ...) → context: dereference, color_key: dereference  
- * between two numbers (a * b) → context: multiplication, color_key: operator
- Always explain WHY parentheses exist when present
- Always explain ; as a language enforcement rule
- Always explain & fully (address-of vs bitwise AND based on context)
- Return ONLY valid JSON, nothing else.`;

// ============================================================
// GEMINI SYSTEM PROMPT
// ============================================================
const GEMINI_SYSTEM_PROMPT = `You are an expert C programming syntax analyzer for "Apex Lab", an educational platform for beginners.

Deconstruct C code token by token. Explain WHY each token exists, WHY it is placed there, and WHAT breaks if removed.

Return ONLY a valid JSON object. No markdown, no code fences, no extra text whatsoever.

Required JSON format:
{
  "lines": [
    {
      "line_number": 1,
      "raw_code": "int a = 5;",
      "overview": "One sentence describing what this entire line accomplishes.",
      "tokens": [
        {
          "symbol": "int",
          "context": "type_declaration",
          "color_key": "type",
          "overview_explanation": "One sentence max — what is this token in plain language?",
          "deep_explanation": "Full explanation: WHY this token? WHY here? Memory impact? What breaks if removed? Beginner gotchas?",
          "memory_effect": "stack_alloc_4bytes | heap_alloc | pointer_box | link | glow | update_value | none",
          "animation_trigger": "create_variable_box | create_pointer_box | draw_arrow | pulse_variable | update_value | show_address | none"
        }
      ]
    }
  ]
}

color_key must be exactly one of: type, identifier, pointer, operator, address, dereference, value, keyword, punctuation

RULES:
- * after type in declaration (int *p) → pointer_declaration, color_key: pointer
- * before existing pointer (*p=...) → dereference, color_key: dereference
- * between numbers (a*b) → multiplication, color_key: operator
- Always explain WHY parentheses exist when present
- Always explain semicolon as a language rule
- Return ONLY valid JSON. Nothing else.`;

// ============================================================
// TOKEN COLOR MAP
// ============================================================
const TOKEN_COLORS = {
  type:        "#4a9eff",
  identifier:  "#50fa7b",
  pointer:     "#ff5555",
  operator:    "#f1fa8c",
  address:     "#ffb86c",
  dereference: "#ff79c6",
  value:       "#bd93f9",
  keyword:     "#8be9fd",
  punctuation: "#444",
};

// ============================================================
// TOKEN CARD
// ============================================================
function TokenCard({ token, index }) {
  const [layer, setLayer] = useState("overview");
  const color = TOKEN_COLORS[token.color_key] || "#888";

  return (
    <div style={{
      background: "#060606", border: "1px solid #111",
      borderLeft: `3px solid ${color}`, borderRadius: "6px",
      padding: "0.7rem", marginBottom: "0.5rem",
      animation: "fadeSlideIn 0.25s ease forwards",
      animationDelay: `${index * 0.05}s`, opacity: 0,
    }}>
      {/* Symbol + badges */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem", flexWrap: "wrap", gap: "0.3rem" }}>
        <code style={{
          color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.88rem", fontWeight: 700,
          background: `${color}18`, padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.02em"
        }}>
          {token.symbol}
        </code>
        <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
          <span style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "3px", padding: "1px 7px", fontSize: "0.6rem", color: "#444", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.03em" }}>
            {token.context?.replace(/_/g, " ")}
          </span>
          {token.animation_trigger && token.animation_trigger !== "none" && (
            <span style={{ background: "#0a0000", border: "1px solid #1a0000", borderRadius: "3px", padding: "1px 7px", fontSize: "0.6rem", color: "#600000" }}>
              ⬡ {token.animation_trigger}
            </span>
          )}
        </div>
      </div>

      {/* Layer toggle */}
      <div style={{ display: "flex", gap: "0.3rem", marginBottom: "0.45rem" }}>
        {[["overview", "OVERVIEW"], ["deep", "DEEP DIVE"]].map(([id, label]) => (
          <button key={id} onClick={() => setLayer(id)} style={{
            background: layer === id ? `${color}18` : "transparent",
            border: `1px solid ${layer === id ? color : "#1a1a1a"}`,
            borderRadius: "4px", padding: "2px 10px",
            color: layer === id ? color : "#333",
            fontSize: "0.6rem", cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, letterSpacing: "0.06em", transition: "all 0.15s"
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Explanation */}
      <div style={{
        color: layer === "deep" ? "#aaa" : "#777",
        fontSize: "0.77rem", lineHeight: 1.7,
        padding: "0.5rem 0.65rem",
        background: "#080808", borderRadius: "5px",
        border: "1px solid #0f0f0f",
      }}>
        {layer === "overview" ? token.overview_explanation : token.deep_explanation}
      </div>
    </div>
  );
}

// ============================================================
// LINE GROUP
// ============================================================
function LineGroup({ lineData, lineIndex }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ marginBottom: "0.85rem" }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          marginBottom: expanded ? "0.45rem" : 0,
          cursor: "pointer", padding: "0.4rem 0.6rem", borderRadius: "5px",
          background: "#060606", border: "1px solid #0d0d0d", transition: "background 150ms ease",
        }}
      >
        <span style={{ color: "#2a2a2a", fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", minWidth: "18px" }}>
          {lineData.line_number}
        </span>
        <code style={{ color: "#d0d0d0", fontSize: "0.76rem", fontFamily: "'JetBrains Mono', monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {lineData.raw_code}
        </code>
        <span style={{ color: "#B00000", fontSize: "0.65rem", flexShrink: 0 }}>{expanded ? "▾" : "▸"}</span>
      </div>

      {expanded && lineData.overview && (
        <div style={{ fontSize: "0.72rem", color: "#555", marginBottom: "0.4rem", paddingLeft: "0.6rem", borderLeft: "2px solid #1a0000", fontStyle: "italic", lineHeight: 1.5 }}>
          {lineData.overview}
        </div>
      )}

      {expanded && lineData.tokens?.map((token, i) => (
        <TokenCard key={i} token={token} index={i} />
      ))}
    </div>
  );
}

// ============================================================
// MEMORY BOX COMPONENT (for CoreVisualizer)
// ============================================================
function MemoryBox({ name, value, address, isPointer, isGlowing, arrowTarget, style: extraStyle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", ...extraStyle }}>
      {/* Variable name label */}
      <div style={{
        fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace",
        color: isPointer ? "#ff5555" : "#888", marginBottom: "5px",
        textAlign: "center"
      }}>
        {isPointer ? `*${name}` : name}
      </div>

      {/* Value box */}
      <div style={{
        width: "80px", height: "58px",
        border: `1px solid ${isGlowing ? "#B00000" : isPointer ? "#2a0000" : "#1a1a1a"}`,
        borderRadius: "6px",
        background: isGlowing ? "rgba(176,0,0,0.12)" : isPointer ? "#080000" : "#0a0a0a",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem",
        color: isGlowing ? "#ff6060" : isPointer ? "#600000" : "#888",
        boxShadow: isGlowing
          ? "0 0 20px rgba(176,0,0,0.5), inset 0 0 10px rgba(176,0,0,0.1)"
          : isPointer ? "0 0 10px rgba(176,0,0,0.08)" : "none",
        transition: "all 0.4s ease",
        position: "relative", overflow: "hidden"
      }}>
        {isGlowing && (
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse, rgba(176,0,0,0.15) 0%, transparent 70%)",
            animation: "pulseGlow 1.5s ease-in-out infinite"
          }} />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{value ?? "—"}</span>
      </div>

      {/* Address tag */}
      <div style={{
        width: "80px", height: "20px", marginTop: "3px",
        border: "1px solid #1a0000", borderRadius: "4px",
        background: "#050000", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: "#3a0000", fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace" }}>
          {address}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// ANIMATED ARROW COMPONENT
// ============================================================
function PointerArrow({ visible, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: "0.4rem", opacity: visible ? 1 : 0.1,
      transition: "opacity 0.5s ease", marginTop: "28px"
    }}>
      <svg width="90" height="32" viewBox="0 0 90 32" fill="none">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={visible ? "#B00000" : "#1a0000"} />
          </marker>
        </defs>
        <line
          x1="0" y1="16" x2="78" y2="16"
          stroke={visible ? "#B00000" : "#1a0000"}
          strokeWidth="1.5"
          strokeDasharray={visible ? "none" : "4 3"}
          markerEnd="url(#arrowhead)"
          style={{ transition: "stroke 0.5s" }}
        />
      </svg>
      {visible && (
        <span style={{ color: "#500000", fontSize: "0.6rem", letterSpacing: "0.08em" }}>{label}</span>
      )}
    </div>
  );
}

// ============================================================
// TAB: SYNTAX ANATOMY — Phase 2 (Claude API Live)
// ============================================================
function SyntaxAnatomy({ topic, apiKey, provider, onAnalysisComplete }) {
  const [code, setCode] = useState(`int a = 5;\nint *p = &a;\n*p = 42;\nprintf("%d\\n", *(p));`);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!apiKey) { setError("No API key. Please log in again."); return; }
    if (!code.trim()) { setError("Please enter C code to analyze."); return; }
    setLoading(true); setError(""); setOutput(null);

    try {
      let raw = "";

      if (provider === "anthropic") {
        // ---- Anthropic Claude ----
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4000,
            system: CLAUDE_SYSTEM_PROMPT,
            messages: [{ role: "user", content: `Analyze this C code:\n\n${code}` }]
          })
        });
        if (!res.ok) {
          const e = await res.json();
          throw new Error(e?.error?.message || `Anthropic API error ${res.status}`);
        }
        const data = await res.json();
        raw = data.content?.[0]?.text || "";

      } else {
        // ---- Google Gemini ----
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: GEMINI_SYSTEM_PROMPT }] },
            contents: [{
              role: "user",
              parts: [{ text: `Analyze this C code and return ONLY valid JSON:\n\n${code}` }]
            }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 4000 }
          })
        });
        if (!res.ok) {
          const e = await res.json();
          throw new Error(e?.error?.message || `Gemini API error ${res.status}`);
        }
        const data = await res.json();
        raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }

      const cleaned = raw.replace(/\`\`\`json|\`\`\`/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setOutput(parsed);
      if (onAnalysisComplete) onAnalysisComplete(parsed);

    } catch (err) {
      setError(err.message || "Parse error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid #0d0d0d", display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
        <IconCode />
        <div>
          <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>Syntax Anatomy</div>
          <div style={{ color: "#555", fontSize: "0.72rem" }}>Token deconstructor · Overview & Deep Dive</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#B00000", boxShadow: "0 0 6px #B00000" }} />
          <span style={{ background: "#0a0000", border: "1px solid #1a0000", borderRadius: "4px", padding: "2px 8px", fontSize: "0.65rem", color: "#B00000", letterSpacing: "0.08em" }}>
            {provider === "gemini" ? "GEMINI LIVE" : "CLAUDE LIVE"}
          </span>
        </div>
      </div>

      {/* Split pane */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>

        {/* LEFT — Editor */}
        <div style={{ borderRight: "1px solid #111", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "0.55rem 1rem", borderBottom: "1px solid #0a0a0a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#2a2a2a", fontSize: "0.68rem", letterSpacing: "0.1em" }}>C CODE</span>
            <button onClick={analyze} disabled={loading} style={{
              background: loading ? "#0a0000" : "#B00000", border: "none", borderRadius: "4px",
              padding: "4px 16px", color: loading ? "#300000" : "#fff",
              fontSize: "0.72rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.05em", transition: "all 0.2s",
              boxShadow: loading ? "none" : "0 0 20px rgba(176,0,0,0.4), 0 0 40px rgba(176,0,0,0.15)",
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              {loading ? "⬡ ANALYZING..." : "ANALYZE →"}
            </button>
          </div>

          <div style={{ flex: 1, position: "relative", background: "#030303" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "38px", background: "#050505", borderRight: "1px solid #0d0d0d", padding: "0.75rem 0", pointerEvents: "none", zIndex: 1 }}>
              {code.split("\n").map((_, i) => (
                <div key={i} style={{ color: "#252525", fontSize: "0.7rem", lineHeight: "1.7", textAlign: "center", fontFamily: "'JetBrains Mono', monospace" }}>
                  {i + 1}
                </div>
              ))}
            </div>
            <textarea value={code} onChange={e => { setCode(e.target.value); setError(""); }} spellCheck={false} style={{
              position: "absolute", inset: 0, paddingLeft: "50px", paddingTop: "0.75rem", paddingRight: "0.75rem",
              background: "transparent", border: "none", resize: "none", outline: "none",
              color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace",
              fontFeatureSettings: "'ss01','ss02','cv01'",
              fontSize: "0.8rem", lineHeight: "1.7", width: "100%", height: "100%",
              boxSizing: "border-box", caretColor: "#B00000"
            }} />
          </div>

          {error && (
            <div style={{ padding: "0.5rem 1rem", background: "#0a0000", borderTop: "1px solid #2a0000", color: "#B00000", fontSize: "0.72rem" }}>
              ⚠ {error}
            </div>
          )}
        </div>

        {/* RIGHT — Output */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "0.55rem 1rem", borderBottom: "1px solid #0a0a0a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#2a2a2a", fontSize: "0.68rem", letterSpacing: "0.1em" }}>TOKEN ANALYSIS</span>
            {output && (
              <span style={{ color: "#2a2a2a", fontSize: "0.65rem" }}>
                {output.lines?.reduce((a, l) => a + (l.tokens?.length || 0), 0)} tokens · {output.lines?.length} lines
              </span>
            )}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem", scrollbarWidth: "thin", scrollbarColor: "#111 #000" }}>
            {!output && !loading && !error && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "0.75rem" }}>
                <div style={{ fontSize: "2.5rem", opacity: 0.07 }}>⬡</div>
                <div style={{ color: "#222", fontSize: "0.78rem", textAlign: "center", lineHeight: 1.6 }}>
                  Write C code · Press ANALYZE
                </div>
              </div>
            )}

            {loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#B00000", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
                <div style={{ color: "#3a0000", fontSize: "0.72rem", letterSpacing: "0.12em" }}>DECONSTRUCTING...</div>
              </div>
            )}

            {output && output.lines?.map((lineData, i) => (
              <LineGroup key={i} lineData={lineData} lineIndex={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PHASE 3 — ANIMATION PRIMITIVES
// ============================================================

// S-curve easing: cubic-bezier(0.37, 0, 0.63, 1)
const EASING = "cubic-bezier(0.37, 0, 0.63, 1)";

// Generate a random-ish hex address
const makeAddr = (seed) => {
  const h = ((seed * 2654435761) >>> 0).toString(16).toUpperCase().slice(0, 3);
  return `0x${h}`;
};

// ============================================================
// DRAW-BOX ANIMATION — borders grow from top-left corner
// ============================================================
function DrawBox({ width, height, color, delay = 0, onDone, children, style: extra }) {
  const [phase, setPhase] = useState(0);
  // S-curve: slow→fast→slow

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), delay);
    const t2 = setTimeout(() => setPhase(2), delay + 400);
    const t3 = setTimeout(() => { setPhase(3); if (onDone) onDone(); }, delay + 800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [delay]);

  const dur = `400ms`;
  const ease = EASING;

  return (
    <div style={{ position: "relative", width, height, ...extra }}>
      {/* Top border */}
      <div style={{
        position: "absolute", top: 0, left: 0, height: "1px",
        background: color, width: phase >= 1 ? "100%" : "0%",
        transition: `width ${dur} ${ease}`,
      }} />
      {/* Left border */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "1px",
        background: color, height: phase >= 1 ? "100%" : "0%",
        transition: `height ${dur} ${ease}`,
      }} />
      {/* Bottom border */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, height: "1px",
        background: color, width: phase >= 2 ? "100%" : "0%",
        transition: `width ${dur} ${ease}`,
      }} />
      {/* Right border */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "1px",
        background: color, height: phase >= 2 ? "100%" : "0%",
        transition: `height ${dur} ${ease}`,
      }} />
      {/* Content fades in when done */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: phase >= 3 ? 1 : 0,
        transition: `opacity 200ms ease`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {children}
      </div>
    </div>
  );
}

// ============================================================
// VARIABLE BOX — single variable visualization
// ============================================================
function VarBox({ name, value, address, type, isPointer, isGlowing, delay = 0 }) {
  const [labelVisible, setLabelVisible] = useState(false);
  const [addrVisible, setAddrVisible] = useState(false);
  const [displayVal, setDisplayVal] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const borderColor = isGlowing ? "#B00000" : isPointer ? "#4a0000" : "#2a2a2a";
  const bgColor = isGlowing ? "rgba(176,0,0,0.1)" : isPointer ? "#060000" : "#080808";
  const textColor = isGlowing ? "#ff6060" : isPointer ? "#600000" : "#666";

  // Animate value typing
  const typeValue = (val) => {
    if (val === null || val === undefined) return;
    const str = String(val);
    setIsTyping(true);
    setDisplayVal("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayVal(str.slice(0, i));
      if (i >= str.length) { clearInterval(iv); setIsTyping(false); }
    }, 60);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setLabelVisible(true), delay + 850);
    const t2 = setTimeout(() => { setAddrVisible(true); }, delay + 1000);
    const t3 = setTimeout(() => { if (value !== null && value !== undefined) typeValue(value); }, delay + 1050);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [value, delay]);

  // Glow pulse update
  useEffect(() => {
    if (isGlowing && value !== null) typeValue(value);
  }, [isGlowing, value]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      {/* Name label */}
      <div style={{
        fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace",
        color: isPointer ? "#ff5555" : "#777",
        opacity: labelVisible ? 1 : 0,
        transition: `opacity 300ms ease`,
        minHeight: "16px",
      }}>
        {isPointer ? `*${name}` : name}
        {type && <span style={{ color: "#333", marginLeft: "4px" }}>:{type}</span>}
      </div>

      {/* Main box drawn with border animation */}
      <DrawBox
        width={76} height={56}
        color={borderColor}
        delay={delay}
        style={{
          background: bgColor,
          boxShadow: isGlowing ? "0 0 20px rgba(176,0,0,0.4), inset 0 0 10px rgba(176,0,0,0.08)" : "none",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem",
          color: textColor,
          borderRight: isTyping ? "1px solid #B00000" : "1px solid transparent",
          transition: "color 0.3s ease",
        }}>
          {displayVal ?? ""}
        </span>
      </DrawBox>

      {/* Address tag */}
      <div style={{
        width: "76px", height: "18px",
        border: "1px solid #1a0000", borderRadius: "3px",
        background: "#040000",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: addrVisible ? 1 : 0,
        transition: "opacity 300ms ease",
      }}>
        <span style={{ color: "#3a0000", fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace" }}>
          {address}
        </span>
      </div>

      {/* &name label */}
      <div style={{
        fontSize: "0.58rem", color: "#2a0000",
        fontFamily: "'JetBrains Mono', monospace",
        opacity: addrVisible ? 1 : 0,
        transition: "opacity 300ms ease 100ms",
      }}>
        &{name}
      </div>
    </div>
  );
}

// ============================================================
// ANIMATED POINTER ARROW
// ============================================================
function AnimArrow({ from, to, label, visible, delay = 0 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) { setProgress(0); return; }
    const start = Date.now();
    const dur = 500;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / dur);
      // S-curve approximation
      const s = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setProgress(s);
      if (p < 1) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  const W = 100, H = 40;
  const x2 = progress * (W - 16);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", marginTop: "24px" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <defs>
          <marker id={`ah-${from}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#B00000" />
          </marker>
        </defs>
        <line
          x1="0" y1="20" x2={x2} y2="20"
          stroke="#B00000" strokeWidth="1.5"
          markerEnd={progress > 0.9 ? `url(#ah-${from})` : ""}
          style={{ transition: "none" }}
        />
      </svg>
      <span style={{
        color: "#400000", fontSize: "0.58rem",
        fontFamily: "'JetBrains Mono', monospace",
        opacity: progress > 0.9 ? 1 : 0,
        transition: "opacity 200ms ease",
      }}>
        {label}
      </span>
    </div>
  );
}

// ============================================================
// ARRAY VISUALIZATION
// ============================================================
function ArrayViz({ name, values, delay = 0 }) {
  const n = values.length;
  const cellW = 56, cellH = 52;
  const totalW = n * cellW;
  const [outerDone, setOuterDone] = useState(false);
  const [dividers, setDividers] = useState([]);
  const [cellValues, setCellValues] = useState(Array(n).fill(null));
  const [labelVisible, setLabelVisible] = useState(false);

  useEffect(() => {
    // After outer box done, draw dividers one by one
    if (!outerDone) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDividers(prev => [...prev, i - 1]);
      if (i >= n - 1) clearInterval(iv);
    }, 180);
    // Then fill values
    setTimeout(() => {
      values.forEach((v, idx) => {
        setTimeout(() => {
          setCellValues(prev => { const a = [...prev]; a[idx] = v; return a; });
        }, idx * 100);
      });
    }, (n - 1) * 180 + 300);
    setTimeout(() => setLabelVisible(true), 200);
    return () => clearInterval(iv);
  }, [outerDone]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
      {/* Name label */}
      <div style={{
        fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "#777",
        opacity: labelVisible ? 1 : 0, transition: "opacity 300ms ease",
        marginLeft: "4px",
      }}>
        {name}[{n}]
      </div>

      {/* Outer box + cells */}
      <div style={{ position: "relative" }}>
        <DrawBox
          width={totalW} height={cellH}
          color="#2a2a2a" delay={delay}
          onDone={() => setOuterDone(true)}
        />

        {/* Dividers grow top→bottom */}
        {Array.from({ length: n - 1 }, (_, i) => (
          <div key={i} style={{
            position: "absolute", top: 0, left: (i + 1) * cellW,
            width: "1px", background: "#2a2a2a",
            height: dividers.includes(i) ? `${cellH}px` : "0px",
            transition: `height 120ms ${EASING}`,
          }} />
        ))}

        {/* Index labels + values */}
        {Array.from({ length: n }, (_, i) => (
          <div key={i} style={{
            position: "absolute", top: 0, left: i * cellW,
            width: cellW, height: cellH,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "2px",
          }}>
            <span style={{ fontSize: "0.58rem", color: "#333", fontFamily: "'JetBrains Mono', monospace" }}>
              [{i}]
            </span>
            <span style={{
              fontSize: "0.78rem", color: "#888", fontFamily: "'JetBrains Mono', monospace",
              opacity: cellValues[i] !== null ? 1 : 0,
              transition: "opacity 200ms ease",
            }}>
              {cellValues[i] ?? ""}
            </span>
          </div>
        ))}
      </div>

      {/* Address */}
      <div style={{ fontSize: "0.58rem", color: "#2a0000", fontFamily: "'JetBrains Mono', monospace", marginLeft: "4px" }}>
        {makeAddr(name.charCodeAt(0) * 7)}
      </div>
    </div>
  );
}

// ============================================================
// MATRIX VISUALIZATION
// ============================================================
function MatrixViz({ name, rows, cols, values, delay = 0 }) {
  const cellW = 48, cellH = 40;
  const totalW = cols * cellW, totalH = rows * cellH;
  const [outerDone, setOuterDone] = useState(false);
  const [hLines, setHLines] = useState([]);   // horizontal dividers
  const [vLines, setVLines] = useState([]);   // vertical dividers
  const [cellValues, setCellValues] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(null))
  );
  const [labelVisible, setLabelVisible] = useState(false);

  useEffect(() => {
    if (!outerDone) return;
    setLabelVisible(true);

    // Horizontal lines appear after top border reaches right corner (~400ms)
    let hi = 0;
    const hiv = setInterval(() => {
      hi++;
      setHLines(p => [...p, hi - 1]);
      if (hi >= rows - 1) clearInterval(hiv);
    }, 150);

    // Vertical lines appear after left border reaches bottom corner (~400ms)
    let vi = 0;
    const viv = setInterval(() => {
      vi++;
      setVLines(p => [...p, vi - 1]);
      if (vi >= cols - 1) clearInterval(viv);
    }, 120);

    // Fill values after grid complete
    const gridDone = Math.max((rows - 1) * 150, (cols - 1) * 120) + 400;
    setTimeout(() => {
      let idx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = values?.[r]?.[c] ?? (r * cols + c);
          const delay2 = idx * 60;
          setTimeout(() => {
            setCellValues(prev => {
              const next = prev.map(row => [...row]);
              next[r][c] = v;
              return next;
            });
          }, delay2);
          idx++;
        }
      }
    }, gridDone);

    return () => { clearInterval(hiv); clearInterval(viv); };
  }, [outerDone]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
      <div style={{
        fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "#777",
        opacity: labelVisible ? 1 : 0, transition: "opacity 300ms ease", marginLeft: "4px",
      }}>
        {name}[{rows}][{cols}]
      </div>

      <div style={{ position: "relative" }}>
        <DrawBox
          width={totalW} height={totalH}
          color="#2a2a2a" delay={delay}
          onDone={() => setOuterDone(true)}
        />

        {/* Horizontal dividers — grow left to right */}
        {Array.from({ length: rows - 1 }, (_, i) => (
          <div key={`h${i}`} style={{
            position: "absolute", left: 0, top: (i + 1) * cellH,
            height: "1px", background: "#2a2a2a",
            width: hLines.includes(i) ? `${totalW}px` : "0px",
            transition: `width 150ms ${EASING}`,
          }} />
        ))}

        {/* Vertical dividers — grow top to bottom */}
        {Array.from({ length: cols - 1 }, (_, i) => (
          <div key={`v${i}`} style={{
            position: "absolute", top: 0, left: (i + 1) * cellW,
            width: "1px", background: "#2a2a2a",
            height: vLines.includes(i) ? `${totalH}px` : "0px",
            transition: `height 120ms ${EASING}`,
          }} />
        ))}

        {/* Cell labels + values */}
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => (
            <div key={`${r}-${c}`} style={{
              position: "absolute",
              top: r * cellH, left: c * cellW,
              width: cellW, height: cellH,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "1px",
            }}>
              <span style={{ fontSize: "0.5rem", color: "#2a2a2a", fontFamily: "'JetBrains Mono', monospace" }}>
                [{r}][{c}]
              </span>
              <span style={{
                fontSize: "0.72rem", color: "#777", fontFamily: "'JetBrains Mono', monospace",
                opacity: cellValues[r][c] !== null ? 1 : 0,
                transition: "opacity 200ms ease",
              }}>
                {cellValues[r][c] ?? ""}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================
// STRUCT VISUALIZATION
// ============================================================
function StructViz({ name, typeName, fields, delay = 0 }) {
  const cellH = 44;
  const totalH = fields.length * cellH;
  const W = 140;
  const [outerDone, setOuterDone] = useState(false);
  const [fieldLines, setFieldLines] = useState([]);
  const [fieldValues, setFieldValues] = useState(Array(fields.length).fill(null));
  const [labelVisible, setLabelVisible] = useState(false);

  useEffect(() => {
    if (!outerDone) return;
    setLabelVisible(true);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setFieldLines(p => [...p, i - 1]);
      if (i >= fields.length - 1) clearInterval(iv);
    }, 160);
    setTimeout(() => {
      fields.forEach((f, idx) => {
        setTimeout(() => {
          setFieldValues(p => { const a = [...p]; a[idx] = f.value ?? "—"; return a; });
        }, idx * 120);
      });
    }, (fields.length - 1) * 160 + 200);
    return () => clearInterval(iv);
  }, [outerDone]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
      <div style={{
        fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "#777",
        opacity: labelVisible ? 1 : 0, transition: "opacity 300ms ease", marginLeft: "4px",
      }}>
        struct <span style={{ color: "#4a9eff" }}>{typeName}</span> {name}
      </div>

      <div style={{ position: "relative" }}>
        <DrawBox width={W} height={totalH} color="#2a2a2a" delay={delay} onDone={() => setOuterDone(true)} />

        {/* Field dividers */}
        {Array.from({ length: fields.length - 1 }, (_, i) => (
          <div key={i} style={{
            position: "absolute", left: 0, top: (i + 1) * cellH,
            height: "1px", background: "#1a1a1a",
            width: fieldLines.includes(i) ? `${W}px` : "0px",
            transition: `width 140ms ${EASING}`,
          }} />
        ))}

        {/* Field labels + values */}
        {fields.map((f, i) => (
          <div key={i} style={{
            position: "absolute", top: i * cellH, left: 0,
            width: W, height: cellH,
            display: "flex", alignItems: "center",
            padding: "0 10px", gap: "8px",
          }}>
            <span style={{ fontSize: "0.6rem", color: "#B00000", fontFamily: "'JetBrains Mono', monospace", minWidth: "40px" }}>
              {f.type}
            </span>
            <span style={{ fontSize: "0.62rem", color: "#555", fontFamily: "'JetBrains Mono', monospace", flex: 1 }}>
              {f.name}
            </span>
            <span style={{
              fontSize: "0.72rem", color: "#888", fontFamily: "'JetBrains Mono', monospace",
              opacity: fieldValues[i] !== null ? 1 : 0,
              transition: "opacity 200ms ease",
            }}>
              {fieldValues[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// LINKED LIST NODE
// ============================================================
function ListNode({ value, address, nextAddr, isHead, isTail, arrowVisible, delay = 0 }) {
  const [labelVisible, setLabelVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLabelVisible(true), delay + 850);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        {isHead && (
          <div style={{
            fontSize: "0.58rem", color: "#B00000",
            fontFamily: "'JetBrains Mono', monospace",
            opacity: labelVisible ? 1 : 0, transition: "opacity 300ms ease",
          }}>HEAD</div>
        )}

        {/* Node: data | next */}
        <div style={{ position: "relative", display: "flex" }}>
          {/* Data section */}
          <DrawBox width={56} height={48} color="#2a2a2a" delay={delay}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "0.52rem", color: "#333" }}>data</span>
              <span style={{ fontSize: "0.82rem", color: "#888", fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
            </div>
          </DrawBox>

          {/* Next pointer section */}
          <DrawBox width={40} height={48} color="#2a0000" delay={delay + 100}
            style={{ background: "#040000" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "0.5rem", color: "#2a0000" }}>next</span>
              <span style={{ fontSize: "0.62rem", color: "#3a0000", fontFamily: "'JetBrains Mono', monospace" }}>
                {isTail ? "NULL" : "→"}
              </span>
            </div>
          </DrawBox>
        </div>

        {/* Address */}
        <div style={{
          fontSize: "0.55rem", color: "#2a0000",
          fontFamily: "'JetBrains Mono', monospace",
          opacity: labelVisible ? 1 : 0, transition: "opacity 300ms ease 200ms",
        }}>
          {address}
        </div>

        {isTail && (
          <div style={{
            fontSize: "0.58rem", color: "#444",
            fontFamily: "'JetBrains Mono', monospace",
            opacity: labelVisible ? 1 : 0, transition: "opacity 300ms ease",
          }}>TAIL</div>
        )}
      </div>

      {/* Arrow to next node */}
      {!isTail && (
        <AnimArrow from={address} to={nextAddr} label="" visible={arrowVisible} delay={delay + 900} />
      )}
    </div>
  );
}

// ============================================================
// SORTING BARS (Bubble/Insertion/Selection)
// ============================================================
function SortBars({ values, highlightIdx = [], swapIdx = [], sortedIdx = [] }) {
  const max = Math.max(...values, 1);
  const barW = Math.min(48, Math.floor(320 / values.length));

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "140px", padding: "0 8px" }}>
      {values.map((v, i) => {
        const isHighlight = highlightIdx.includes(i);
        const isSwap = swapIdx.includes(i);
        const isSorted = sortedIdx.includes(i);
        const color = isSorted ? "#50fa7b" : isSwap ? "#ff5555" : isHighlight ? "#ffb86c" : "#2a2a2a";
        const h = Math.max(8, Math.floor((v / max) * 120));

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "0.58rem", color: "#555", fontFamily: "'JetBrains Mono', monospace" }}>{v}</span>
            <div style={{
              width: barW, height: h,
              background: color,
              border: `1px solid ${color}`,
              borderRadius: "3px 3px 0 0",
              boxShadow: isSwap || isHighlight ? `0 0 10px ${color}60` : "none",
              transition: `height 300ms ${EASING}, background 200ms ease, box-shadow 200ms ease`,
            }} />
            <span style={{ fontSize: "0.55rem", color: "#2a2a2a", fontFamily: "'JetBrains Mono', monospace" }}>[{i}]</span>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// DEMO PRESETS
// ============================================================
const DEMOS = {
  variables: {
    label: "Variables & Pointers",
    code: `int a = 5;\nint *p = &a;\n*p = 42;`,
    type: "variables",
  },
  array: {
    label: "Array",
    code: `int arr[5] = {3, 1, 4, 1, 5};`,
    type: "array",
  },
  matrix: {
    label: "Matrix 3×3",
    code: `int M[3][3] = {{1,2,3},{4,5,6},{7,8,9}};`,
    type: "matrix",
  },
  struct: {
    label: "Struct",
    code: `struct Student { int age; float gpa; char name[20]; };`,
    type: "struct",
  },
  linkedlist: {
    label: "Linked List — Build",
    code: `Node *head = create(10);\nhead->next = create(20);\nhead->next->next = create(30);`,
    type: "linkedlist",
  },
  ll_insert: {
    label: "Linked List — Insert",
    code: `insertAfter(head, 15); // insert 15 after head`,
    type: "ll_insert",
  },
  ll_delete: {
    label: "Linked List — Delete",
    code: `deleteNode(&head, 20); // remove node with value 20`,
    type: "ll_delete",
  },
  bubble: {
    label: "Bubble Sort",
    code: `int arr[] = {5, 3, 8, 1, 9, 2};\nbubbleSort(arr, 6);`,
    type: "bubble",
  },
  insertion: {
    label: "Insertion Sort",
    code: `int arr[] = {5, 3, 8, 1, 9, 2};\ninsertionSort(arr, 6);`,
    type: "insertion",
  },
  selection: {
    label: "Selection Sort",
    code: `int arr[] = {5, 3, 8, 1, 9, 2};\nselectionSort(arr, 6);`,
    type: "selection",
  },
};

// ============================================================
// DYNAMIC SCENE BUILDER — reads analysisData JSON
// ============================================================
function buildScene(analysisData) {
  if (!analysisData?.lines) return null;

  const vars = [];
  const pointers = [];
  const arrays = [];
  const structs = [];
  const nodes = [];
  let addrCounter = 100;

  analysisData.lines.forEach(line => {
    const raw = line.raw_code || "";
    line.tokens?.forEach(token => {
      const trigger = token.animation_trigger;
      const ctx = token.context || "";

      // ---- Simple variable ----
      if (trigger === "create_variable_box" || ctx === "type_declaration") {
        // Skip if pointer or array
        if (raw.includes("*") || raw.match(/\w+\[/)) return;
        const m = raw.match(/int\s+(\w+)\s*=\s*([^;]+)/);
        if (m && !vars.find(v => v.name === m[1]) && !pointers.find(p => p.name === m[1])) {
          vars.push({ name: m[1], value: m[2]?.trim(), address: makeAddr(addrCounter++), type: "int" });
        }
      }

      // ---- Pointer ----
      if (trigger === "create_pointer_box" || ctx === "pointer_declaration") {
        const m = raw.match(/int\s*\*\s*(\w+)/);
        if (m && !pointers.find(p => p.name === m[1])) {
          pointers.push({ name: m[1], address: makeAddr(addrCounter++), pointsTo: null, value: null });
        }
      }

      // ---- Address-of link ----
      if (trigger === "draw_arrow" || ctx === "address_of") {
        const m = raw.match(/(\w+)\s*=\s*&(\w+)/);
        if (m) {
          const ptr = pointers.find(p => p.name === m[1]);
          const target = vars.find(v => v.name === m[2]);
          if (ptr && target) { ptr.pointsTo = m[2]; ptr.value = target.address; }
        }
      }

      // ---- Dereference assignment ----
      if (trigger === "update_value" || ctx === "assignment_via_pointer") {
        const m = raw.match(/\*(\w+)\s*=\s*(\d+)/);
        if (m) {
          const ptr = pointers.find(p => p.name === m[1]);
          if (ptr?.pointsTo) {
            const target = vars.find(v => v.name === ptr.pointsTo);
            if (target) target.value = m[2];
          }
        }
      }

      // ---- Array ----
      if (trigger === "create_variable_box" || ctx === "type_declaration") {
        const m = raw.match(/int\s+(\w+)\[(\d+)\]\s*=\s*\{([^}]+)\}/);
        if (m && !arrays.find(a => a.name === m[1])) {
          const vals = m[3].split(",").map(v => v.trim());
          arrays.push({ name: m[1], values: vals, address: makeAddr(addrCounter++) });
        }
      }

      // ---- Struct ----
      if (ctx === "struct_declaration" || raw.includes("struct")) {
        const mName = raw.match(/struct\s+(\w+)\s+(\w+)/);
        if (mName && !structs.find(s => s.varName === mName[2])) {
          structs.push({ typeName: mName[1], varName: mName[2], fields: [] });
        }
      }

      // ---- Linked List node ----
      if (trigger === "create_pointer_box" && raw.includes("Node")) {
        const m = raw.match(/create\((\d+)\)/);
        if (m) {
          nodes.push({
            value: m[1],
            address: makeAddr(addrCounter++),
            isHead: nodes.length === 0,
            isTail: false,
          });
          if (nodes.length > 1) nodes[nodes.length - 2].isTail = false;
          nodes[nodes.length - 1].isTail = true;
        }
      }
    });
  });

  return { vars, pointers, arrays, structs, nodes };
}

// ============================================================
// TAB: CORE VISUALIZER — Phase 3
// ============================================================
function CoreVisualizer({ topic, analysisData }) {
  const [activeDemo, setActiveDemo] = useState("variables");
  const [sceneKey, setSceneKey] = useState(0); // remount to replay
  const [useAnalysis, setUseAnalysis] = useState(false);
  const [sortState, setSortState] = useState(null);
  const [sortStep, setSortStep] = useState(-1);
  const [sortPlaying, setSortPlaying] = useState(false);

  // When new analysisData arrives, switch to dynamic mode
  useEffect(() => {
    if (analysisData) { setUseAnalysis(true); setSceneKey(k => k + 1); }
  }, [analysisData]);

  const replay = () => { setSceneKey(k => k + 1); setSortStep(-1); setSortPlaying(false); };

  // ---- Bubble Sort steps ----
  const buildBubbleSteps = (arr) => {
    const a = [...arr];
    const steps = [{ arr: [...a], hi: [], sw: [], sorted: [] }];
    const sortedIdx = [];
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        steps.push({ arr: [...a], hi: [j, j + 1], sw: [], sorted: [...sortedIdx] });
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          steps.push({ arr: [...a], hi: [], sw: [j, j + 1], sorted: [...sortedIdx] });
        }
      }
      sortedIdx.push(a.length - 1 - i);
      steps.push({ arr: [...a], hi: [], sw: [], sorted: [...sortedIdx] });
    }
    sortedIdx.push(0);
    steps.push({ arr: [...a], hi: [], sw: [], sorted: [...sortedIdx] });
    return steps;
  };

  const sortArr = [5, 3, 8, 1, 9, 2];

  // ---- Insertion Sort steps ----
  const buildInsertionSteps = (arr) => {
    const a = [...arr];
    const steps = [{ arr: [...a], hi: [], sw: [], sorted: [0] }];
    for (let i = 1; i < a.length; i++) {
      let j = i;
      steps.push({ arr: [...a], hi: [i], sw: [], sorted: Array.from({length:i},(_,x)=>x) });
      while (j > 0 && a[j - 1] > a[j]) {
        [a[j], a[j-1]] = [a[j-1], a[j]];
        steps.push({ arr: [...a], hi: [], sw: [j, j-1], sorted: Array.from({length:i},(_,x)=>x) });
        j--;
      }
      steps.push({ arr: [...a], hi: [], sw: [], sorted: Array.from({length:i+1},(_,x)=>x) });
    }
    return steps;
  };

  // ---- Selection Sort steps ----
  const buildSelectionSteps = (arr) => {
    const a = [...arr];
    const steps = [{ arr: [...a], hi: [], sw: [], sorted: [], minIdx: -1 }];
    for (let i = 0; i < a.length - 1; i++) {
      let minI = i;
      for (let j = i + 1; j < a.length; j++) {
        steps.push({ arr: [...a], hi: [j, minI], sw: [], sorted: Array.from({length:i},(_,x)=>x), minIdx: minI });
        if (a[j] < a[minI]) { minI = j; }
      }
      if (minI !== i) {
        [a[i], a[minI]] = [a[minI], a[i]];
        steps.push({ arr: [...a], hi: [], sw: [i, minI], sorted: Array.from({length:i},(_,x)=>x), minIdx: -1 });
      }
      steps.push({ arr: [...a], hi: [], sw: [], sorted: Array.from({length:i+1},(_,x)=>x), minIdx: -1 });
    }
    steps.push({ arr: [...a], hi: [], sw: [], sorted: Array.from({length:a.length},(_,x)=>x), minIdx: -1 });
    return steps;
  };

  const bubbleSteps = buildBubbleSteps(sortArr);
  const insertionSteps = buildInsertionSteps(sortArr);
  const selectionSteps = buildSelectionSteps(sortArr);

  const getSteps = () => {
    if (activeDemo === "insertion") return insertionSteps;
    if (activeDemo === "selection") return selectionSteps;
    return bubbleSteps;
  };

  // ---- Linked List state ----
  const [llNodes, setLlNodes] = useState([
    { value: 10, address: makeAddr(100), nextAddr: makeAddr(200), isHead: true, isTail: false },
    { value: 20, address: makeAddr(200), nextAddr: makeAddr(300), isHead: false, isTail: false },
    { value: 30, address: makeAddr(300), nextAddr: null, isHead: false, isTail: true },
  ]);
  const [llLog, setLlLog] = useState("Initial list: 10 → 20 → 30 → NULL");
  const [llKey, setLlKey] = useState(0);

  const llInsert = (afterVal, newVal) => {
    setLlNodes(prev => {
      const idx = prev.findIndex(n => n.value === afterVal);
      if (idx === -1) return prev;
      const newAddr = makeAddr(Date.now() % 1000);
      const next = [...prev];
      const newNode = { value: newVal, address: newAddr, nextAddr: next[idx].nextAddr, isHead: false, isTail: next[idx].isTail };
      next[idx] = { ...next[idx], nextAddr: newAddr, isTail: false };
      next.splice(idx + 1, 0, newNode);
      return next;
    });
    setLlLog(`Inserted ${newVal} after ${afterVal}`);
    setLlKey(k => k + 1);
  };

  const llDelete = (val) => {
    setLlNodes(prev => {
      const idx = prev.findIndex(n => n.value === val);
      if (idx === -1) return prev;
      const next = [...prev];
      if (idx > 0) next[idx-1] = { ...next[idx-1], nextAddr: next[idx].nextAddr, isTail: next[idx].isTail };
      next.splice(idx, 1);
      if (next.length > 0) { next[0].isHead = true; next[next.length-1].isTail = true; }
      return next;
    });
    setLlLog(`Deleted node with value ${val}`);
    setLlKey(k => k + 1);
  };

  const llReset = () => {
    setLlNodes([
      { value: 10, address: makeAddr(100), nextAddr: makeAddr(200), isHead: true, isTail: false },
      { value: 20, address: makeAddr(200), nextAddr: makeAddr(300), isHead: false, isTail: false },
      { value: 30, address: makeAddr(300), nextAddr: null, isHead: false, isTail: true },
    ]);
    setLlLog("Reset: 10 → 20 → 30 → NULL");
    setLlKey(k => k + 1);
  };

  useEffect(() => {
    const isSortDemo = ["bubble","insertion","selection"].includes(activeDemo);
    if (!isSortDemo) return;
    setSortState(getSteps()[0]);
    setSortStep(0);
    setSortPlaying(false);
  }, [activeDemo]);

  useEffect(() => {
    const isSortDemo = ["bubble","insertion","selection"].includes(activeDemo);
    if (!sortPlaying || !isSortDemo) return;
    const steps = getSteps();
    if (sortStep >= steps.length - 1) { setSortPlaying(false); return; }
    const t = setTimeout(() => {
      const next = sortStep + 1;
      setSortStep(next);
      setSortState(steps[next]);
    }, 550);
    return () => clearTimeout(t);
  }, [sortPlaying, sortStep, activeDemo]);

  // ---- Render scene ----
  const renderScene = () => {
    const demo = DEMOS[activeDemo];

    // Dynamic mode from Claude analysis
    if (useAnalysis && analysisData) {
      const scene = buildScene(analysisData);
      if (!scene) return null;
      let d = 0;
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "flex-start", padding: "1.5rem" }} key={sceneKey}>
          {/* Simple vars + pointers */}
          {scene.vars.map((v) => {
            const delay = d; d += 300;
            const ptr = scene.pointers.find(p => p.pointsTo === v.name);
            return (
              <div key={v.name} style={{ display: "flex", alignItems: "center" }}>
                <VarBox name={v.name} value={v.value} address={v.address} type={v.type} isPointer={false} isGlowing={!!ptr} delay={delay} />
                {ptr && <AnimArrow from={ptr.name} to={v.name} label={`${ptr.name}→&${v.name}`} visible={true} delay={delay+900} />}
                {ptr && <VarBox name={ptr.name} value={ptr.value} address={ptr.address} type="ptr" isPointer={true} isGlowing={false} delay={delay+400} />}
              </div>
            );
          })}
          {/* Arrays */}
          {scene.arrays.map((arr) => {
            const delay = d; d += 400;
            return <ArrayViz key={arr.name} name={arr.name} values={arr.values} delay={delay} />;
          })}
          {/* Structs */}
          {scene.structs.map((st) => {
            const delay = d; d += 400;
            return <StructViz key={st.varName} name={st.varName} typeName={st.typeName} fields={st.fields} delay={delay} />;
          })}
          {/* Linked list nodes */}
          {scene.nodes.length > 0 && (
            <div style={{ display: "flex", alignItems: "center" }}>
              {scene.nodes.map((node, i) => {
                const delay = d + i * 600;
                return <ListNode key={i} value={node.value} address={node.address} nextAddr={scene.nodes[i+1]?.address ?? null} isHead={node.isHead} isTail={node.isTail} arrowVisible={!node.isTail} delay={delay} />;
              })}
            </div>
          )}
        </div>
      );
    }

    // Preset demos
    if (activeDemo === "variables") return (
      <div style={{ display: "flex", alignItems: "center", gap: "0", padding: "1rem" }} key={sceneKey}>
        <VarBox name="a" value="5" address={makeAddr(100)} type="int" isPointer={false} isGlowing={true} delay={0} />
        <AnimArrow from="p" to="a" label="p → &a" visible={true} delay={900} />
        <VarBox name="p" value={makeAddr(100)} address={makeAddr(200)} type="int*" isPointer={true} isGlowing={false} delay={400} />
      </div>
    );

    if (activeDemo === "array") return (
      <div style={{ padding: "1.5rem" }} key={sceneKey}>
        <ArrayViz name="arr" values={[3, 1, 4, 1, 5]} delay={0} />
      </div>
    );

    if (activeDemo === "matrix") return (
      <div style={{ padding: "1.5rem" }} key={sceneKey}>
        <MatrixViz name="M" rows={3} cols={3} values={[[1,2,3],[4,5,6],[7,8,9]]} delay={0} />
      </div>
    );

    if (activeDemo === "struct") return (
      <div style={{ padding: "1.5rem" }} key={sceneKey}>
        <StructViz
          name="s1" typeName="Student"
          fields={[
            { type: "int", name: "age", value: "20" },
            { type: "float", name: "gpa", value: "3.8" },
            { type: "char[]", name: "name[20]", value: "Apex" },
          ]}
          delay={0}
        />
      </div>
    );

    if (activeDemo === "linkedlist") return (
      <div style={{ display: "flex", alignItems: "center", padding: "1.5rem", gap: "0", flexWrap: "wrap" }} key={sceneKey}>
        <ListNode value={10} address={makeAddr(100)} nextAddr={makeAddr(200)} isHead={true} isTail={false} arrowVisible={true} delay={0} />
        <ListNode value={20} address={makeAddr(200)} nextAddr={makeAddr(300)} isHead={false} isTail={false} arrowVisible={true} delay={600} />
        <ListNode value={30} address={makeAddr(300)} nextAddr={null} isHead={false} isTail={true} arrowVisible={false} delay={1200} />
      </div>
    );

    // ---- Sorting demos (bubble / insertion / selection) ----
    if (["bubble","insertion","selection"].includes(activeDemo)) {
      const steps = getSteps();
      const label = activeDemo === "bubble" ? "Bubble Sort"
                  : activeDemo === "insertion" ? "Insertion Sort" : "Selection Sort";
      return (
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }} key={sceneKey}>
          <div style={{ color: "#333", fontSize: "0.68rem", letterSpacing: "0.1em" }}>{label.toUpperCase()}</div>
          {sortState && (
            <SortBars
              values={sortState.arr}
              highlightIdx={sortState.hi}
              swapIdx={sortState.sw}
              sortedIdx={sortState.sorted}
            />
          )}
          {/* Step description */}
          <div style={{ fontSize: "0.72rem", color: "#555", fontFamily: "'JetBrains Mono', monospace", minHeight: "18px" }}>
            {sortState?.sw?.length > 0 ? `↔ Swapping indices [${sortState.sw.join("] & [")}]`
            : sortState?.hi?.length > 0 ? `⬡ Comparing indices [${sortState.hi.join("] & [")}]`
            : sortState?.sorted?.length === sortArr.length ? "✓ Array sorted!"
            : "Scanning..."}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setSortPlaying(true)}
              disabled={sortPlaying || sortStep >= steps.length - 1}
              style={{
                background: sortPlaying ? "#0a0000" : "#B00000", border: "none", borderRadius: "5px",
                padding: "5px 14px", color: sortPlaying ? "#300000" : "#fff",
                fontSize: "0.72rem", fontWeight: 700, cursor: sortPlaying ? "not-allowed" : "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: sortPlaying ? "none" : "0 0 12px rgba(176,0,0,0.4)",
              }}
            >
              {sortPlaying ? "▐▐ RUNNING" : sortStep >= steps.length - 1 ? "✓ SORTED" : "▶ PLAY"}
            </button>
            <button
              onClick={() => { const n = Math.min(sortStep+1, steps.length-1); setSortStep(n); setSortState(steps[n]); }}
              disabled={sortPlaying || sortStep >= steps.length - 1}
              style={{ background: "transparent", border: "1px solid #1a1a1a", borderRadius: "5px", padding: "5px 12px", color: "#444", fontSize: "0.72rem", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}
            >STEP →</button>
            <button
              onClick={() => { setSortStep(0); setSortState(steps[0]); setSortPlaying(false); }}
              style={{ background: "transparent", border: "1px solid #1a0000", borderRadius: "5px", padding: "5px 12px", color: "#400000", fontSize: "0.72rem", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}
            >↺ RESET</button>
            <span style={{ color: "#1a1a1a", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace" }}>
              step {Math.max(0, sortStep + 1)}/{steps.length}
            </span>
          </div>
        </div>
      );
    }

    // ---- Linked List — Build ----
    if (activeDemo === "linkedlist") return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem" }} key={llKey}>
        <div style={{ color: "#333", fontSize: "0.68rem", letterSpacing: "0.1em" }}>LINKED LIST — BUILD</div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0" }}>
          {llNodes.map((node, i) => (
            <ListNode
              key={node.address}
              value={node.value}
              address={node.address}
              nextAddr={node.nextAddr}
              isHead={node.isHead}
              isTail={node.isTail}
              arrowVisible={!node.isTail}
              delay={i * 600}
            />
          ))}
        </div>
        <div style={{ fontSize: "0.7rem", color: "#555", fontFamily: "'JetBrains Mono', monospace" }}>{llLog}</div>
      </div>
    );

    // ---- Linked List — Insert ----
    if (activeDemo === "ll_insert") return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem" }} key={llKey}>
        <div style={{ color: "#333", fontSize: "0.68rem", letterSpacing: "0.1em" }}>LINKED LIST — INSERT NODE</div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0" }}>
          {llNodes.map((node, i) => (
            <ListNode
              key={node.address}
              value={node.value}
              address={node.address}
              nextAddr={node.nextAddr}
              isHead={node.isHead}
              isTail={node.isTail}
              arrowVisible={!node.isTail}
              delay={0}
            />
          ))}
        </div>
        <div style={{ fontSize: "0.7rem", color: "#555", fontFamily: "'JetBrains Mono', monospace" }}>{llLog}</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button onClick={() => llInsert(10, 15)} style={{ background: "#0a0000", border: "1px solid #B00000", borderRadius: "5px", padding: "5px 12px", color: "#B00000", fontSize: "0.7rem", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
            Insert 15 after 10
          </button>
          <button onClick={() => llInsert(20, 25)} style={{ background: "#0a0000", border: "1px solid #B00000", borderRadius: "5px", padding: "5px 12px", color: "#B00000", fontSize: "0.7rem", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
            Insert 25 after 20
          </button>
          <button onClick={llReset} style={{ background: "transparent", border: "1px solid #1a0000", borderRadius: "5px", padding: "5px 12px", color: "#400000", fontSize: "0.7rem", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
            ↺ Reset
          </button>
        </div>
      </div>
    );

    // ---- Linked List — Delete ----
    if (activeDemo === "ll_delete") return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem" }} key={llKey}>
        <div style={{ color: "#333", fontSize: "0.68rem", letterSpacing: "0.1em" }}>LINKED LIST — DELETE NODE</div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0" }}>
          {llNodes.map((node, i) => (
            <ListNode
              key={node.address}
              value={node.value}
              address={node.address}
              nextAddr={node.nextAddr}
              isHead={node.isHead}
              isTail={node.isTail}
              arrowVisible={!node.isTail}
              delay={0}
            />
          ))}
        </div>
        <div style={{ fontSize: "0.7rem", color: "#555", fontFamily: "'JetBrains Mono', monospace" }}>{llLog}</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {llNodes.map(node => (
            <button key={node.value} onClick={() => llDelete(node.value)} style={{
              background: "#0a0000", border: "1px solid #B00000", borderRadius: "5px",
              padding: "5px 12px", color: "#B00000", fontSize: "0.7rem", cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              Delete {node.value}
            </button>
          ))}
          <button onClick={llReset} style={{ background: "transparent", border: "1px solid #1a0000", borderRadius: "5px", padding: "5px 12px", color: "#400000", fontSize: "0.7rem", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
            ↺ Reset
          </button>
        </div>
      </div>
    );

    return null;
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid #0d0d0d", display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
        <IconCpu />
        <div>
          <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>Core Visualizer</div>
          <div style={{ color: "#555", fontSize: "0.72rem" }}>
            {useAnalysis ? "Dynamic mode — reading your code" : "Live memory & execution engine"}
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {useAnalysis && (
            <span style={{ background: "#001a00", border: "1px solid #003000", borderRadius: "4px", padding: "2px 8px", fontSize: "0.65rem", color: "#50fa7b" }}>
              DYNAMIC
            </span>
          )}
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#B00000", boxShadow: "0 0 6px #B00000" }} />
        </div>
      </div>

      {/* Demo selector */}
      <div style={{ padding: "0.6rem 1rem", borderBottom: "1px solid #0a0a0a", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        {Object.entries(DEMOS).map(([key, demo]) => (
          <button key={key} onClick={() => { setActiveDemo(key); setUseAnalysis(false); replay(); }} style={{
            background: activeDemo === key ? "rgba(176,0,0,0.08)" : "transparent",
            border: `1px solid ${activeDemo === key ? "#B00000" : "#141414"}`,
            borderRadius: "5px", padding: "0.3rem 0.7rem",
            color: activeDemo === key ? "#B00000" : "#2a2a2a",
            fontSize: "0.68rem", cursor: "pointer", transition: "all 150ms ease",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {demo.label}
          </button>
        ))}
        {useAnalysis && (
          <button onClick={() => { setUseAnalysis(true); replay(); }} style={{
            background: "#001a00", border: "1px solid #50fa7b",
            borderRadius: "5px", padding: "0.3rem 0.7rem",
            color: "#50fa7b", fontSize: "0.68rem", cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            ⬡ Your Code
          </button>
        )}
        <button onClick={replay} style={{
          marginLeft: "auto", background: "transparent", border: "1px solid #1a0000",
          borderRadius: "5px", padding: "0.3rem 0.7rem", color: "#400000",
          fontSize: "0.68rem", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif",
        }}>
          ↺ REPLAY
        </button>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "auto", position: "relative", scrollbarWidth: "thin", scrollbarColor: "#111 #000" }}>
        {/* Ambient glow */}
        <div style={{
          position: "fixed", top: "50%", left: "60%", transform: "translate(-50%,-50%)",
          width: "400px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(176,0,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{ position: "relative", zIndex: 1, minHeight: "100%" }}>
          {renderScene()}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 2 — MAIN DASHBOARD
// ============================================================
function Dashboard({ apiKey, provider }) {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [activeTab, setActiveTab] = useState("docs");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);

  const tabs = [
    { id: "docs", label: "Academic Docs", icon: <IconBook /> },
    { id: "syntax", label: "Syntax Anatomy", icon: <IconCode /> },
    { id: "visualizer", label: "Core Visualizer", icon: <IconCpu /> },
  ];

  return (
    <div style={{
      height: "100vh", background: "#000", display: "flex", flexDirection: "column",
      fontFamily: "'Space Grotesk', sans-serif", overflow: "hidden"
    }}>

      {/* Top Header */}
      <header style={{
        height: "48px", borderBottom: "1px solid #0d0d0d", display: "flex", alignItems: "center",
        padding: "0 1.25rem", gap: "1rem", flexShrink: 0, background: "#000",
        boxShadow: "none"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/apex-logo.png" alt="Apex Lab" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
          <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em" }}>
            APEX <span style={{ color: "#B00000" }}>LAB</span>
          </div>
          <div style={{ color: "#222", fontSize: "0.7rem", marginLeft: "4px" }}>·</div>
          <div style={{ color: "#333", fontSize: "0.7rem", letterSpacing: "0.1em" }}>C-VISUALIZER</div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Active topic pill */}
        <div style={{
          background: "#0a0000", border: "1px solid #1a0000", borderRadius: "20px",
          padding: "0.25rem 0.75rem", display: "flex", alignItems: "center", gap: "0.4rem"
        }}>
          <span style={{ color: "#B00000", fontSize: "0.75rem" }}>{selectedTopic.icon}</span>
          <span style={{ color: "#800000", fontSize: "0.72rem" }}>{selectedTopic.title}</span>
        </div>

        {/* API status */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#B00000", boxShadow: "0 0 6px #B00000" }} />
          <span style={{ color: "#555", fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace" }}>
            {provider === "gemini" ? "Gemini" : "Claude"} · {apiKey.slice(0, 10)}...
          </span>
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? "220px" : "48px",
          borderRight: "1px solid #111", display: "flex", flexDirection: "column",
          transition: "width 0.25s ease", flexShrink: 0, overflow: "hidden",
          background: "#000"
        }}>
          {/* Sidebar toggle */}
          <div
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              height: "40px", display: "flex", alignItems: "center",
              padding: "0 0.75rem", gap: "0.6rem", cursor: "pointer",
              borderBottom: "1px solid #0d0d0d",
              color: "#444", fontSize: "0.68rem", letterSpacing: "0.1em",
              transition: "color 0.2s"
            }}
          >
            <div style={{ transform: sidebarOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s", color: "#333" }}>
              <IconChevron />
            </div>
            {sidebarOpen && <span>CURRICULUM</span>}
          </div>

          {/* Topic list */}
          <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "thin", scrollbarColor: "#111 #000" }}>
            {TOPICS.map(topic => {
              const isActive = selectedTopic.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => { setSelectedTopic(topic); setActiveTab("docs"); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.65rem",
                    padding: "0.6rem 0.75rem", cursor: "pointer",
                    background: isActive ? "rgba(176,0,0,0.05)" : "transparent",
                    borderLeft: `2px solid ${isActive ? "#B00000" : "transparent"}`,
                    transition: "all 150ms ease", minWidth: 0
                  }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "6px", flexShrink: 0,
                    background: isActive ? "rgba(176,0,0,0.1)" : "#080808",
                    border: `1px solid ${isActive ? "#B00000" : "#141414"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.72rem", color: isActive ? "#B00000" : "#333",
                    fontFamily: "'JetBrains Mono', monospace",
                    transition: "all 150ms ease"
                  }}>
                    {topic.icon}
                  </div>
                  {sidebarOpen && (
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ color: isActive ? "#fff" : "#555", fontSize: "0.75rem", fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {topic.title}
                      </div>
                      <div style={{ color: "#333", fontSize: "0.62rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {topic.subtitle}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Module count */}
          {sidebarOpen && (
            <div style={{ padding: "0.6rem 0.75rem", borderTop: "1px solid #0d0d0d" }}>
              <div style={{ color: "#222", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                {TOPICS.length} MODULES LOADED
              </div>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

          {/* Ambient glow behind content */}
          <div style={{
            position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
            width: "500px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(176,0,0,0.04) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0
          }} />

          {/* Tab bar */}
          <div style={{
            display: "flex", borderBottom: "1px solid #111", padding: "0 1rem",
            flexShrink: 0, background: "#000", zIndex: 1
          }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.65rem 1rem",
                    background: "none", border: "none",
                    borderBottom: `2px solid ${isActive ? "#B00000" : "transparent"}`,
                    color: isActive ? "#fff" : "#444",
                    fontSize: "0.78rem", cursor: "pointer", transition: "all 0.15s",
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: isActive ? 600 : 400,
                    marginBottom: "-1px"
                  }}
                >
                  <span style={{ color: isActive ? "#B00000" : "#333" }}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative", zIndex: 1 }}>
            {activeTab === "docs" && <AcademicDocs topic={selectedTopic} />}
            {activeTab === "syntax" && <SyntaxAnatomy topic={selectedTopic} apiKey={apiKey} provider={provider} onAnalysisComplete={(data) => setAnalysisData(data)} />}
            {activeTab === "visualizer" && <CoreVisualizer topic={selectedTopic} analysisData={analysisData} />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #000; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: #000; }
      ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
      @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      @keyframes pulseGlow { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
      @keyframes fadeSlideIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      @keyframes borderGlow { 0%,100% { box-shadow: 0 0 12px rgba(176,0,0,0.3); } 50% { box-shadow: 0 0 24px rgba(176,0,0,0.5); } }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #000; overflow: hidden; }
      ::selection { background: rgba(176,0,0,0.3); color: #fff; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: #2a2a2a; }
      input:focus { box-shadow: 0 0 0 2px rgba(176,0,0,0.3) !important; }
    `;
    document.head.appendChild(style);
  }, []);

  return session
    ? <Dashboard apiKey={session.key} provider={session.provider} />
    : <LoginScreen onLogin={setSession} />;
}
