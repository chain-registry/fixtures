.PHONY: def update

def: update

update:
	@echo "Updating cosmos/chain-registry submodule"
	git config submodule.repos/chain-registry.url https://github.com/cosmos/chain-registry
	git submodule sync repos/chain-registry
	git submodule update --init --remote repos/chain-registry
	@echo "cosmos/chain-registry submodule is updated"
