import { Card } from 'antd';
import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';

class Format extends React.Component {
  state = {
    text: "在React中，你可以使用`react-syntax-highlighter`库来将字符串格式化为JS或Java代码。以下是一个使用`react-syntax-highlighter`的示例：\n\n1. 安装`react-syntax-highlighter`\n\n```bash\nnpm install react-syntax-highlighter\n```\n\n2. 导入所需的组件和样式\n\n```javascript\nimport { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';\nimport { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';\n```\n\n3. 使用`SyntaxHighlighter`组件将字符串格式化为JS代码\n\n```javascript\nconst code = \"const foo = 'bar';\";\n// 设置语言为javascript\nconst language = 'javascript';\n\nfunction MyComponent() {\n  return (\n    <SyntaxHighlighter language={language} style={dark}>\n      {code}\n    </SyntaxHighlighter>\n  );\n}\n```\n\n这样，`MyComponent`组件将会以`dark`样式将`const foo = 'bar';`字符串格式化为JS代码。你可以根据需要选择不同的样式，例如`light`、`coy`等。\n\n同样的，你可以将`language`设置为`java`来将字符串格式化为Java代码。",
  };
  render() {
    const { text } = this.state;
    const lines = text.split(/\n{1,}/);
    // 使用正则表达式提取JSX代码
    const jsxCode = text.match(/`([^`]*)`/)[1];

    // 格式化展示提取的JSX代码
    console.log('Formatted JSX Code:');
    console.log(jsxCode.replace(/\n/g, '\n  '));

    // const regex = /```(jsx|java)\n([\s\S]*?)```/g;
    const regex = /```(bash|javascript)\n([\s\S]*?)```/g;
    let match;
    const codeBlocks = [];

    while ((match = regex.exec(text)) !== null) {
      console.log('match', match);
      codeBlocks.push(match[0]);
    }

    console.log('codeBlocks', codeBlocks); // 输出所有的代码块

    const parts = text.split(/(```.*?```)/gs);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('```') && part.endsWith('```')) {
            // 这是一个代码块，用 span 来渲染
            const code = part.slice(3, -3); // 移除开始和结束的 ```
            return (
              <Card>
                <span children={code} style={{ whiteSpace: 'pre-wrap' }} />
              </Card>
            );
          } else {
            // 这是非代码块的文本，用 div 来渲染
            return <div key={index}>{part}</div>;
          }
        })}
        {codeBlocks.map((item) => (
          <Card title="Markdown Example">
            <ReactMarkdown children={item} />
          </Card>
        ))}

        <Card title="Markdown Example">
          <ReactMarkdown children={text} />
        </Card>
        <div>
          {lines.map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </div>
      </>
    );
  }
}

export default Format;
