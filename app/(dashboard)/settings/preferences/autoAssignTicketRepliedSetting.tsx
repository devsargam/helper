"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useSavingIndicator } from "@/components/hooks/useSavingIndicator";
import { SavingIndicator } from "@/components/savingIndicator";
import { useSession } from "@/components/useSession";
import { api } from "@/trpc/react";
import { SwitchSectionWrapper } from "../sectionWrapper";

const AutoAssignTicketRepliedSetting = () => {
  const { user } = useSession() ?? {};
  const [autoAssignTicketWhenRepliedEnabled, setAutoAssignTicketWhenRepliedEnabled] = useState(
    !user?.preferences?.disableNextTicketPreview,
  );
  const savingIndicator = useSavingIndicator();
  const utils = api.useUtils();

  const { mutate: update } = api.user.update.useMutation({
    onSuccess: () => {
      utils.user.currentUser.invalidate();
      savingIndicator.setState("saved");
    },
    onError: (error) => {
      savingIndicator.setState("error");
      toast.error("Error updating preferences", { description: error.message });
    },
  });

  const handleSwitchChange = (checked: boolean) => {
    setAutoAssignTicketWhenRepliedEnabled(checked);
    savingIndicator.setState("saving");
    update({
      preferences: {
        autoAssignTicketWhenReplied: checked,
      },
    });
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-4 z-10">
        <SavingIndicator state={savingIndicator.state} />
      </div>
      <SwitchSectionWrapper
        title="Auto Assign Ticket When Replied"
        description="Automatically assign a ticket when a user replies to an email"
        initialSwitchChecked={autoAssignTicketWhenRepliedEnabled}
        onSwitchChange={handleSwitchChange}
      >
        <></>
      </SwitchSectionWrapper>
    </div>
  );
};

export default AutoAssignTicketRepliedSetting;
