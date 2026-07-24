import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Example form — wire this up to your actual settings.
        </p>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Basic details about your workspace.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="workspace-name">Name</Label>
            <Input id="workspace-name" defaultValue="__APP_TITLE__" />
          </div>
          <Button className="self-start">Save changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
