import React from "react";
import TopTracks from "../../components/TopTracks/TopTracks";
import TopArtists from "../../components/TopArtists/TopArtists";
import Playlists from "../Playlists/Playlists";

import { TimeRangeEnum } from "../../spotify/types";
import * as Tabs from "@radix-ui/react-tabs";
import "./TopItems.css";

function TopItems() {
    return (
        <div>
            <Tabs.Root className="TabsRoot" defaultValue="tab2">
                <div className="TabHeader">
                    <h1>Top Items</h1>
                    <Tabs.List
                        className="TabsList"
                        aria-label="Manage your account"
                    >
                        <Tabs.Trigger className="TabsTrigger" value="tab1">
                            4 Weeks
                        </Tabs.Trigger>
                        <Tabs.Trigger className="TabsTrigger" value="tab2">
                            6 Months
                        </Tabs.Trigger>
                        <Tabs.Trigger className="TabsTrigger" value="tab3">
                            All Time
                        </Tabs.Trigger>
                    </Tabs.List>
                </div>
                <Tabs.Content className="TabsContent" value="tab1">
                    <div className="top-items">
                        <TopArtists timeRange={TimeRangeEnum.Short} />
                        <TopTracks timeRange={TimeRangeEnum.Short} />
                    </div>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab2">
                    <div className="top-items">
                        <TopArtists timeRange={TimeRangeEnum.Medium} />
                        <TopTracks timeRange={TimeRangeEnum.Medium} />
                    </div>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab3">
                    <div className="top-items">
                        <TopArtists timeRange={TimeRangeEnum.Long} />
                        <TopTracks timeRange={TimeRangeEnum.Long} />
                    </div>
                </Tabs.Content>
                <Playlists />
            </Tabs.Root>
        </div>
    );
}

export default TopItems;
