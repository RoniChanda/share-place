import { Fragment } from "react";
import MainNavigation from "../components/Navigation/MainNavigation";
import Card from "../components/UIElements/Card";

function ErrorPage() {
  return (
    <Fragment>
      <MainNavigation />
      <main className="center">
        <Card>
          <h2>This page does not exist!</h2>
        </Card>
      </main>
    </Fragment>
  );
}

export default ErrorPage;
