{
  description = "Earn development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      
      prisma-6_5 = pkgs.prisma-engines.overrideAttrs (oldAttrs: rec {
        version = "6.5.0";
        src = pkgs.fetchFromGitHub {
          owner = "prisma";
          repo = "prisma-engines";
          rev = "173f8d54f8d52e692c7e27e72a88314ec7aeff60";
          sha256 = "sha256-gQLDskabTaNk19BJi9Kv4TiEfVck2QZ7xdhopt5KH6M=";
        };
        cargoHash = "";
      });
    in {
      devShell = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          nodejs_20
          nodePackages.pnpm
          mysql80
          openssl
          pkg-config
          prisma-6_5
          zlib
        ];

        shellHook = ''
          export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-6_5}/bin/schema-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${prisma-6_5}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-6_5}/lib/libquery_engine.node"
          export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-6_5}/bin/introspection-engine"
          export PRISMA_FMT_BINARY="${prisma-6_5}/bin/prisma-fmt"
          
        '';

      };
    });
} 
