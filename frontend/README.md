# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



// {
//     "title": "Add Two Numbers",
//     "description": "Write a program that takes two integers as input and returns their sum.",
//     "difficulty": "easy",
//     "tags": "array",
//     "visibleTestCases": [
//         {
//             "input": "2 3",
//             "output": "5",
//             "explanation": "2 + 3 equals 5"
//         },
//         {
//             "input": "-1 5",
//             "output": "4",
//             "explanation": "-1 + 5 equals 4"
//         }
//     ],
//     "hiddenTestCases": [
//         {
//             "input": "10 20",
//             "output": "30"
//         },
//         {
//             "input": "100 250",
//             "output": "350"
//         }
//     ],
//     "startCode": [
//         {
//             "language": "C++",
//             "initialCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read input here\n    cout << a + b;\n    return 0;\n}"
//         },
//         {
//             "language": "Java",
//             "initialCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Read input here\n    }\n}"
//         },
//         {
//             "language": "JavaScript",
//             "initialCode": "const readline = require('readline');\n\n// Complete input handling here"
//         }
//     ],
//     "referenceSolution": [
//         {
//             "language": "C++",
//             "completeCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}"
//         },
//         {
//             "language": "Java",
//             "completeCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}"
//         },
//         {
//             "language": "JavaScript",
//             "completeCode": "const input = require('fs').readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(a + b);"
//         }
//     ]
// }
