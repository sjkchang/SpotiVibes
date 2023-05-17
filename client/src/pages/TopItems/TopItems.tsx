import React, { useEffect, useState } from "react";
import TopTracks from "../../components/TopTracks/TopTracks";
import TopArtists from "../../components/TopArtists/TopArtists";
import { TimeRangeEnum } from "../../spotify/types";
import * as Tabs from "@radix-ui/react-tabs";
import "./TopItems.css";

interface TopItemsProps extends React.HTMLAttributes<any> {
    toggleSeed: (uri: string) => void;
    includesSeed: (uri: string) => boolean;
}

function TopItems({ toggleSeed, includesSeed }: TopItemsProps) {
    return (
        <div>
            <Tabs.Root className="TabsRoot" defaultValue="tab2">
                <div className="TabHeader">
                    <div className="Lable">Top Items</div>
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
                        <TopArtists
                            timeRange={TimeRangeEnum.Short}
                            toggleSeed={toggleSeed}
                            includesSeed={includesSeed}
                        />
                        <TopTracks
                            timeRange={TimeRangeEnum.Short}
                            toggleSeed={toggleSeed}
                            includesSeed={includesSeed}
                        />
                    </div>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab2">
                    <div className="top-items">
                        <TopArtists
                            timeRange={TimeRangeEnum.Medium}
                            toggleSeed={toggleSeed}
                            includesSeed={includesSeed}
                        />
                        <TopTracks
                            timeRange={TimeRangeEnum.Medium}
                            toggleSeed={toggleSeed}
                            includesSeed={includesSeed}
                        />
                    </div>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab3">
                    <div className="top-items">
                        <TopArtists
                            timeRange={TimeRangeEnum.Long}
                            toggleSeed={toggleSeed}
                            includesSeed={includesSeed}
                        />
                        <TopTracks
                            timeRange={TimeRangeEnum.Long}
                            toggleSeed={toggleSeed}
                            includesSeed={includesSeed}
                        />
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
}

export default TopItems;
