import { formatter } from "@/lib/utils";
import { AutomobileClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { FormattedAutomobile } from "@/app/types";

const AutomobilesPage = async () => {
  const automobiles = await prismadb.automobile.findMany();

  const formattedAutomobiles: FormattedAutomobile[] = automobiles.map(
    (automobile) => ({
      id: automobile.id,
      type: automobile.type,
      price: formatter.format(automobile.price.toNumber()),
      description: automobile.description,
    })
  );

  return (
    <div>
      <AutomobileClient data={formattedAutomobiles} />
    </div>
  );
};

export default AutomobilesPage;
