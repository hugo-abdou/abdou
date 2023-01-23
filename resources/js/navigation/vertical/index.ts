import type { VerticalNavItems } from "@/@layouts/types";

export default [
    {
        title: "Home",
        to: { name: "index" },
        icon: { icon: "tabler-smart-home" }
    },
    {
        title: "Users",
        to: { name: "users" },
        icon: { icon: "tabler-users" }
    }
] as VerticalNavItems;
