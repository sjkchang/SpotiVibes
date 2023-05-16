import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import "./styles.css";

const TabsDemo = () => (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List className="TabsList" aria-label="Manage your account">
            <Tabs.Trigger className="TabsTrigger" value="tab1">
                Account
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="tab2">
                Password
            </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1"></Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2"></Tabs.Content>
    </Tabs.Root>
);

export default TabsDemo;
