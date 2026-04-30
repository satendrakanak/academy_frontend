import { SiteSettingsDashboard } from "@/components/admin/settings/site-settings-dashboard";
import { settingsServerService } from "@/services/settings/settings.server";
import { PaymentGatewayAdmin } from "@/types/settings";

const SiteSettingsPage = async () => {
  let gateways: PaymentGatewayAdmin[] = [];

  try {
    const response = await settingsServerService.getGateways();
    gateways = response.data;
  } catch {
    gateways = [];
  }

  return <SiteSettingsDashboard gateways={gateways} />;
};

export default SiteSettingsPage;
