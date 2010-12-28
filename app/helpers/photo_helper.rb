Tdc.helpers do
  def photo_position_id(index)
    index == 0 ? 'first' : index == (@photos.length-1) ? 'last' : nil
  end
end