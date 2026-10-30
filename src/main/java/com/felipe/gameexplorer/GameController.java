package com.felipe.gameexplorer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class GameController {
    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/api/games")
    public String buscarGames(@RequestParam String nome) {

        return gameService.buscarJogos(nome);
    }

    @GetMapping("/api/games/{id}")
    public String buscarDetalhes(@PathVariable int id) {
        return gameService.buscarDetalhes(id);
    }

    @GetMapping("/api/games/{id}/screenshots")
    public String buscarScreenshots(@PathVariable int id) {
        return gameService.buscarScreenshots(id);
    }
}
