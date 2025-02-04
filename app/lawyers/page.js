'use client'

import { useState } from "react";
import Base from "@/layout/base";
import Lawyer from "@/components/lawyer";

export default function(){

    const [data, setData] = useState([])

    return <Base>
    <section className="lawyers section">
        <div className="container">
            <Lawyer/>
        </div>
    </section>
    </Base>
}