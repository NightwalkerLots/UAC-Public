import { world as World } from 'mojang-minecraft';
export { World };
class CommandError extends Error {
    code;
    command;
    constructor(code, message, command) {
        super(message);
        this.code = code;
        this.command = command;
        this.name = this.constructor.name;
        this.message += `\nCode: ${code}  -  Command: ${command}`;
        this.stack = this.stack.replace(/.*\n?/, '');
    }
}
export const execCmd = (command, source = 'overworld') => {
    try {
        return (typeof source == 'string' ? World.getDimension(source) : source).runCommand(command);
    }
    catch (e) {
        if (e instanceof Error)
            throw e;
        const { statusCode, statusMessage } = JSON.parse(e);
        throw new CommandError(statusCode, statusMessage, command);
    }
};