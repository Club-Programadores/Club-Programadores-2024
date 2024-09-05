import React, { useState } from "react";
import { EditUserProfile } from "../components/userSettings/EditUserProfile";
import { EditProjects } from "../components/userSettings/EditProjects";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const SettingsPage = () => {
  return (
    <div className="flex container justify-center py-12 bg-gray-100">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Cuenta</TabsTrigger>
          <TabsTrigger value="projects">Proyectos</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <EditUserProfile />
        </TabsContent>
        <TabsContent value="projects">
          <EditProjects />
        </TabsContent>
      </Tabs>
    </div>
  );
};
