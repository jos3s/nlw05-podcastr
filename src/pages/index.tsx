import { GetStaticProps } from "next";

import { useEffect } from "react";
import { Header } from "../components/Header/Header";
import { api } from "../services/api";

type Episode = {
	id: string;
	title: string;
	members: string;
}

type HomeProps = {
	episodes: Episode[];
}

export default function Home(props: HomeProps) {
	return <p>{JSON.stringify(props.episodes)}</p>;
}

export const getStaticProps:  GetStaticProps = async () => {
	const { data } = await api.get("episodes", {
		params: {
			_limit: 12,
			_sort: "published_at",
			_order:"desc"
		}
	});
	return {
		props: {
			episodes: data,
		},
		revalidate: 60 * 60 * 8,
	};
};;
