function cleanInput(input) {
    return input
        .toLowerCase()
        .trim()
        .split(" ")
        .filter((item) => item !== "");
}
async function startREPL(state) {
    const rl = state.readline;
    rl.prompt();
    rl.on("line", async (input) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            rl.prompt();
            return;
        }
        const commandName = cleanedInput[0];
        const cmd = state.commands[commandName];
        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            rl.prompt();
            return;
        }
        try {
            await cmd.callback(state);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
        rl.prompt();
    });
}
export { cleanInput, startREPL };
