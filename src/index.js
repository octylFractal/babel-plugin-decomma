function lastElement(array) { return array[array.length - 1] }

export default function ({ types: t }) {
    return {
        name: "decomma",
        visitor: {
            SequenceExpression(path) {
                const last = lastElement(path.node.expressions);
                const parentBlock = path.scope.block;
                const parentCtx = path.findParent(p => p.parent === parentBlock);
                // insert most expressions before the current line
                path.node.expressions.forEach(expr => {
                    if (expr === last) {
                        return;
                    }
                    parentCtx.insertBefore(t.expressionStatement(expr))
                })
                // replace the comma expression with its result (last expr)
                path.replaceWith(last);
            }
        }
    };
}