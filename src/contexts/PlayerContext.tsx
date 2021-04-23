import { createContext, ReactNode, useState } from "react";

type Episode = {
	title: string;
	members: string;
	thumbnail: string;
	duration: number;
	url: string;
};

type PlayerContextData = {
	episodeList: Episode[];
	currentEpisodeIndex: number;
	isPlaying: boolean;
	hasNext: boolean;
	hasPrevious: boolean;
	play: (episode: Episode) => void;
	playlist: (list: Episode[], index: number) => void;
	setPlayingState: (state: boolean) => void;
	togglePlay: () => void;
	playNext: () => void;
	playPrevious: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
	children: ReactNode;
};

export function PlayerContextProvider({
	children,
}: PlayerContextProviderProps) {
	const [episodeList, setEpisodeList] = useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	function play(episode: Episode) {
		setEpisodeList([episode]);
		setCurrentEpisodeIndex(0);
		setIsPlaying(true);
	}

	function playlist(list: Episode[], index: number) {
		setEpisodeList(list);
		setCurrentEpisodeIndex(index);
		setIsPlaying(true);
	}

	function togglePlay() {
		setIsPlaying(!isPlaying);
	}

	function setPlayingState(state: boolean) {
		setIsPlaying(state);
	}

	const hasPrevious = currentEpisodeIndex > 0;
	const hasNext = currentEpisodeIndex + 1 < episodeList.length;

	function playNext() {
		const nextEpisodeIndex = currentEpisodeIndex + 1;
		if (hasNext) {
			setCurrentEpisodeIndex(nextEpisodeIndex);
		}
	}

	function playPrevious() {
		if (hasPrevious) {
			setCurrentEpisodeIndex(currentEpisodeIndex - 1);
		}
	}

	return (
		<PlayerContext.Provider
			value={{
				episodeList,
				currentEpisodeIndex,
				isPlaying,
				hasNext,
				hasPrevious,
				play,
				togglePlay,
				playlist,
				setPlayingState,
				playNext,
				playPrevious,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
}