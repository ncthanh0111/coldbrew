export const PerformanceConfig = {
    // Performance thresholds
    THRESHOLDS: {
        PAGE_LOAD: {
            MAX_TIME: 5000, // 5 seconds
            WARNING_TIME: 3000 // 3 seconds
        },
        LOGIN: {
            MAX_TIME: 3000, // 3 seconds
            WARNING_TIME: 2000 // 2 seconds
        },
        SEARCH: {
            MAX_TIME: 2000, // 2 seconds
            WARNING_TIME: 1000 // 1 second
        },
        API_RESPONSE: {
            MAX_TIME: 1000, // 1 second
            WARNING_TIME: 500 // 500ms
        }
    },
    
    // Load testing configuration
    LOAD_TEST: {
        USERS: {
            MIN: 1,
            MAX: 10,
            STEP: 2
        },
        DURATION: {
            RAMP_UP: 60, // seconds
            STEADY_STATE: 300, // seconds
            RAMP_DOWN: 60 // seconds
        },
        THINK_TIME: {
            MIN: 1000, // ms
            MAX: 3000 // ms
        }
    },
    
    // Performance metrics
    METRICS: {
        FIRST_CONTENTFUL_PAINT: 2000,
        LARGEST_CONTENTFUL_PAINT: 4000,
        FIRST_INPUT_DELAY: 100,
        CUMULATIVE_LAYOUT_SHIFT: 0.1
    }
};