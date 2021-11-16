const compiler = require("./Compiler");
const deleteController = require("./deleteController");
const path = require("path");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

exports.HandleSubmit = async (req, res) => {
  const { code, input, lang } = req.body;
  const randText = uuidv4();

  const cPlusFile1 = "cplusCode" + randText + ".cpp";
  const cPlusFile2 = "inputCplus" + randText + ".txt";
  const cPlusFile3 = "cplusExe" + randText + ".exe";

  const cFile1 = "cCode" + randText + ".c";
  const cFile2 = "inputC" + randText + ".txt";
  const cFile3 = "cExe" + randText + ".exe";

  const pythonFile1 = "pythonCode" + randText + ".py";
  const pythonFile2 = "inputPython" + randText + ".txt";

  const javaFile2 = "inputJava" + randText + ".txt";
  const javaFile1 = "javaCode" + randText + ".java";
  // const javaFile3 = "javaClass" + randText + ".class";
  // const javaFile3 = "test" + ".class";
  const javaFile3 = ("javaClass" + randText).split("-").join("") + ".class";

  switch (lang) {
    case "cpp":
      return compiler
        .CplusplusRunner(code, input, randText)
        .then((data) => {
          console.log("successful compilation " + data);
          console.log("sending " + data);
          res.json(data);

          deleteController.deleteFile(path.join(__dirname, "../" + cPlusFile1));
          deleteController.deleteFile(path.join(__dirname, "../" + cPlusFile2));
          deleteController.deleteFile(path.join(__dirname, "../" + cPlusFile3));
        })
        .catch((err) => {
          console.log("error:  " + err);
          deleteController.deleteFile(path.join(__dirname, "../" + cPlusFile1));
          deleteController.deleteFile(path.join(__dirname, "../" + cPlusFile2));
          deleteController.deleteFile(path.join(__dirname, "../" + cPlusFile3));
        });
    case "c":
      return compiler
        .CRunner(code, input, randText)
        .then((data) => {
          console.log("successful compilation " + data);
          console.log("sending " + data);
          res.json(data);
          deleteController.deleteFile(path.join(__dirname, "../" + cFile2));
          deleteController.deleteFile(path.join(__dirname, "../" + cFile1));
          deleteController.deleteFile(path.join(__dirname, "../" + cFile3));
        })
        .catch((err) => {
          console.log("error: " + err);
          deleteController.deleteFile(path.join(__dirname, "../" + cFile2));
          deleteController.deleteFile(path.join(__dirname, "../" + cFile1));
          deleteController.deleteFile(path.join(__dirname, "../" + cFile3));
        });

    case "python":
      return compiler
        .PythonRunner(code, input, randText)
        .then((data) => {
          console.log("Successful execute " + data);
          console.log("sending " + data);
          res.json(data);
          deleteController.deleteFile(
            path.join(__dirname, "../" + pythonFile2)
          );
          deleteController.deleteFile(
            path.join(__dirname, "../" + pythonFile1)
          );
        })
        .catch((err) => {
          console.log("error:  " + err);
          deleteController.deleteFile(
            path.join(__dirname, "../" + pythonFile2)
          );
          deleteController.deleteFile(
            path.join(__dirname, "../" + pythonFile1)
          );
        });

    case "java":
      return compiler
        .JavaRunner(code, input, randText)
        .then((data) => {
          console.log("Successful execute " + data);
          console.log("sending " + data);
          res.json(data);
          deleteController.deleteFile(path.join(__dirname, "../" + javaFile2));
          deleteController.deleteFile(path.join(__dirname, "../" + javaFile1));
          deleteController.deleteFile(path.join(__dirname, "../" + javaFile3));
        })
        .catch((err) => {
          console.log("error:  " + err);
          deleteController.deleteFile(path.join(__dirname, "../" + javaFile2));
          deleteController.deleteFile(path.join(__dirname, "../" + javaFile1));
          deleteController.deleteFile(path.join(__dirname, "../" + javaFile3));
        });
  }
};
