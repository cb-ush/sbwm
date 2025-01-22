import {
    Commitment,
    Connection,
    GetVersionedTransactionConfig,
    ParsedInstruction,
    ParsedMessageAccount,
    PartiallyDecodedInstruction,
    PublicKey,
    Logs,
    ParsedAccountData,
    TransactionInstruction,
    Transaction,
    ParsedTransactionWithMeta,
    Keypair,
    TransactionSignature,
    VersionedTransactionResponse,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    SignaturesForAddressOptions,
} from "@solana/web3.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const PROGRAM_IDS: PublicKey[] = [
    new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8")
]

const WALLET_IDS: string[] = [

]

class Monitoring {
    private connection: Connection | null = null;
    private subscriptionIds: number[] = []; // Store WebSocket subscription IDs

    /**
     * Initializare monitorizare.
     *
     * @return {Promise<void>}
     */
    public async start(): Promise<void> {

        const wsEndpoint:string = process.env.SOLANA_WSS_ENDPOINT || '';
        const httpEndpoint:string = process.env.SOLANA_HTTP_ENDPOINT || '';

        if (!wsEndpoint.startsWith("ws") || !httpEndpoint.startsWith("http")) {
            throw new Error(
                "Environment variables SOLANA_WSS_ENDPOINT and SOLANA_HTTP_ENDPOINT must be set correctly"
            );
        }

        this.connection = new Connection(httpEndpoint, {
            wsEndpoint,
            commitment: "confirmed",
        });

        // Subscribe to each program ID
        for (const programId of PROGRAM_IDS) {
            const subscriptionId = this.connection.onLogs(
                programId,
                async (logs: Logs) => {
                    await this.handleLogs(logs);
                }
            );
            this.subscriptionIds.push(subscriptionId);
            console.log(`Subscribed to logs for program: ${programId.toBase58()}`);
        }

    }

    /**
     * Procesare log ytranzactie
     *
     * @param {Logs} logs - An object containing transaction logs and the associated signature.
     * @return {Promise<void>} Resolves when the logs are successfully handled.
     *                         If the transaction is already processed, the method exits without further action.
     *                         Also handles logging any potential errors.
     */
    private async handleLogs(logs: Logs): Promise<void> {
        const { signature } = logs;

        // Ignore TX with errors
        if (logs.err) {
            return ;
        }

        try {

            console.log(`Processing logs for transaction ${signature}...`, logs);
        } catch (error) {
            console.error(`Error processing logs for transaction ${signature}:`, error);
        }
    }

    /**
     * Unsubscribe de la conexiunile de web socket.
     *
     * @return {void} Does not return a value.
     */
    cleanup(): void {
        console.log("Cleaning up WebSocket subscriptions...");
        // Unsubscribe from all subscriptions
        for (const subscriptionId of this.subscriptionIds) {
            this.connection?.removeOnLogsListener(subscriptionId).catch(err =>
                console.error(`Error unsubscribing from logs: ${err}`)
            );
        }
    }
}

export default Monitoring;