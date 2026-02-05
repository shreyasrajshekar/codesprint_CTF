import Image from "next/image";
import { Card } from "@/components/ui/card";
export default function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
          <Card>
            <h1>this is the heading</h1><br />
            <p>
              i want to talk abt the challenge
            </p>

          </Card>

      </div>

    </>
  );
}
