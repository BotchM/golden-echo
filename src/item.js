(function() {

  var root = this;
  var previousItem = root.Item || {};

  var Superclass = THREE.Mesh, empty = {};
  var vector = new THREE.Vector3();

  var Item = root.Item = function() {

    var geometry = this.Geometry;
    var material = this.Material;

    Superclass.call(this, geometry, material);

    this.tween = new TWEEN.Tween(this)
      .onUpdate(_.bind(this.update, this))
      .onComplete(_.bind(this.stop, this));

    this.offset = new THREE.Vector3();

    this.reset();

  };

  var PointCloud = function() {

    var geometry = this.Geometry;
    var material = this.Material;

    THREE.PointCloud.call(this, geometry, material);

    this.tween = new TWEEN.Tween(this)
      .onUpdate(_.bind(this.update, this))
      .onComplete(_.bind(this.stop, this));

    this.offset = new THREE.Vector3();

    this.reset();

  };

  var Object3D = function() {

    THREE.Object3D.call(this);

    this.tween = new TWEEN.Tween(this)
      .onUpdate(_.bind(this.update, this))
      .onComplete(_.bind(this.stop, this));

    this.offset = new THREE.Vector3();

    this.reset();

  };

  var ItemProto = {

    /**
     * The duration in milliseconds of how long the item stays visible.
     */
    duration: 0,

    /**
     * A normalized value to determine a scalar of some kind on the item's
     * geometry that is tied to the duration of the corresponding
     * audio's existence.
     */
    t: 0,

    /**
     * Is the item currently enabled?
     */
    enabled: false,

    /**
     * Call in order to place item in visible sight.
     */
    start: function(origin, direction) {

      this.reset();

      this.enabled = this.visible = true;

      vector.copy(this.offset).applyEuler(direction);

      this.position.copy(origin).add(vector);
      this.rotation.copy(direction);

      this.tween.to(empty, this.duration).start();

      return this;

    },

    /**
     * To be called every animation frame the item is visible.
     */
    update: function(t) {

      return this;

    },

    /**
     * Reset the state of the item to its initialized settings. i.e: previsible
     * rendered state.
     */
    stop: function() {

      if (!this.enabled) {
        return this;
      }

      this.visible = this.enabled = false;
      this.position.set(-1000, -1000, -1000);

      this.tween.stop();

      return this;

    },

    reset: function() {

      this.stop();
      return this;

    }

  };

  Item.prototype = Object.create(Superclass.prototype);
  PointCloud.prototype = Object.create(THREE.PointCloud.prototype);
  Object3D.prototype = Object.create(THREE.Object3D.prototype);

  _.extend(Item.prototype, ItemProto);
  _.extend(PointCloud.prototype, ItemProto);
  _.extend(Object3D.prototype, ItemProto);

  Item.PointCloud = PointCloud;
  Item.Object3D = Object3D;

})();