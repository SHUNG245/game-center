import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./componentes/NavBar";
import GameGrid from "./componentes/GameGrid";
import GenreList from "./componentes/GenreList";
import { Genre } from "./hooks/useGenres";
import { useState } from "react";
import PlatformSelector from "./componentes/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./componentes/SortSelector";
import { SearchContext } from "./contexts/SearchContext";
import GameHeading from "./componentes/GameHeading";
export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}
function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <SearchContext.Provider
          value={(searchText) =>
            setGameQuery({ ...gameQuery, searchText: searchText })
          }
        >
          <NavBar />
        </SearchContext.Provider>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectedGenre={(genre) =>
              setGameQuery({ ...gameQuery, genre: genre })
            }
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading gameQuery={gameQuery} />
          <HStack spacing={5} marginBottom={5}>
            <PlatformSelector
              selectedPlatform={gameQuery.platform}
              onSelectedPlatform={(platform) =>
                setGameQuery({ ...gameQuery, platform: platform })
              }
            />
            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setGameQuery({ ...gameQuery, sortOrder: sortOrder })
              }
            />
          </HStack>
        </Box>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
