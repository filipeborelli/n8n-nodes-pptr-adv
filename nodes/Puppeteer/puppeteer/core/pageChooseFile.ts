import { IPageChooseFile } from "./dto/interface";
import { state } from "../state";

export const pageChooseFile = async (data: IPageChooseFile) => {
        const { instance, selector, filename } = data;
        try {
								console.log('pagechoosefile', 'selector:', selector, 'filename:',filename)
								const [fileChooser] = await Promise.all([
									state[instance]?.page.waitForFileChooser(),
									state[instance]?.page.click(selector)
								]);

								await fileChooser.accept([filename]);

                return {
                        status: "success",
                        message: "Upload file selected"
                }
        } catch (error: any) {
                return {
                        error: error?.message || "Error in choosing upload file"
                }
        }
}
