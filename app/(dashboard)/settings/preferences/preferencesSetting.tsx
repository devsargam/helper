import AutoAssignTicketRepliedSetting from "./autoAssignTicketRepliedSetting";
import ConfettiSetting from "./confettiSetting";
import NextTicketPreviewSetting from "./nextTicketPreviewSetting";

const PreferencesSetting = () => {
  return (
    <div className="space-y-6">
      <ConfettiSetting />
      <NextTicketPreviewSetting />
      <AutoAssignTicketRepliedSetting />
    </div>
  );
};

export default PreferencesSetting;
