class ProtobufBuilder {
  constructor() {
    // Nothing to do
  }

  async build(x) {
    console.warn("[logtkjs] ProtobufBuilder.build is abstract and should not be called directly");
    return Buffer.alloc(0);
  }
}

module.exports = ProtobufBuilder;

