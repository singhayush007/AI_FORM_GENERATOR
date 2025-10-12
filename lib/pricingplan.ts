export type PricingPlan = {
    level: string;
    price: number; 
    services: string[];
}

export const pricingPlan: PricingPlan[] = [
    {
        level: "Free",
        price: 0,
        services: [
            "3 Free Credits",
            "Basic Supports",
            "Limited Features",
            "Community Access"
        ]
    },
    {
        level: "Pro",
        price: 29, // INR
        services: [
            "Unlimited Credits",
            "Basic Supports",
            "Limited Features",
            "Community Access"
        ]
    },
    {
        level: "Enterprise",
        price: 70, // INR
        services: [
            "Unlimited Credits",
            "Basic Supports",
            "Limited Features",
            "Community Access",
            "Monthly Updates"
        ]
    },
];
