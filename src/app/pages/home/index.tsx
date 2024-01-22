import {useTranslation} from "react-i18next";
import {redirect} from "react-router-dom";

const Home = () => {

	const { t } = useTranslation();

	redirect("/login")

	return (
		<div>
			<h1>{ t("title") } </h1>
			<p>This is the content of the home page.</p>
		</div>
	);
}

export default Home;
