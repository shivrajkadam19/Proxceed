my-react-native-app/
├── android/                  # Android native code
├── ios/                     # iOS native code
├── src/                     # Main source code
│   ├── app/                 # App-wide configuration
│   │   ├── constants/       # Global constants
│   │   ├── context/         # Context providers
│   │   ├── redux/           # Redux store (if using Redux)
│   │   │   ├── slices/
│   │   │   ├── store.ts
│   │   │   └── hooks.ts
│   │   ├── theme/           # Theming system
│   │   └── utils/           # Global utilities
│   │
│   ├── assets/              # Static assets
│   │   ├── fonts/           # Custom fonts
│   │   ├── icons/           # Vector icons
│   │   └── images/          # Images
│   │
│   ├── features/            # Feature-based modules (key organization pattern)
│   │   └── auth/            # Example feature module
│   │       ├── components/  # Feature-specific components
│   │       ├── hooks/       # Custom hooks
│   │       ├── screens/     # Feature screens
│   │       ├── services/    # API/services
│   │       ├── types/       # Type definitions
│   │       └── index.ts     # Public API exports
│   │
│   ├── navigation/          # Navigation configuration
│   │   ├── root-navigator.tsx
│   │   ├── auth-stack.tsx
│   │   └── types.ts
│   │
│   ├── components/          # Shared UI components
│   │   ├── common/          # Basic reusable components
│   │   └── ui/              # Complex UI components
│   │
│   ├── hooks/               # Shared custom hooks
│   ├── services/            # API/services layer
│   ├── types/               # Global type definitions
│   ├── utils/               # Shared utilities
│   │
│   ├── App.tsx              # Main app component
│   └── index.ts             # Entry point
│
├── .env                    # Environment variables
├── .eslintrc               # ESLint config
├── .prettierrc             # Prettier config
├── babel.config.js         # Babel config
├── metro.config.js         # Metro bundler config
├── tsconfig.json           # TypeScript config
├── package.json
└── README.md