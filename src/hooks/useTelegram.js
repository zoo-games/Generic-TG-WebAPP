import { createModel } from "hox";
import { useState } from "react";
function useTelegram()
{
    const [webapp, setWebapp] = useState(undefined);

    return {
        webapp,
        setWebapp
    }
}

export default createModel(useTelegram);